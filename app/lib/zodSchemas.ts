import { z } from "zod";
import { conformZodMessage } from "@conform-to/zod";

export function onboardingSchema(options?: {
  isUsernameUnique: (username: string) => Promise<boolean>;
}) {
  return z.object({
    userName: z
      .string()
      .min(3)
      .max(150)
      .regex(/^[a-zA-Z0-9-]+$/, {
        message: "Username must contain only letters, numbers, and hyphens",
      })
      .superRefine(async (val, ctx) => {
        if (!options?.isUsernameUnique) {
          ctx.addIssue({
            code: "custom",
            message: conformZodMessage.VALIDATION_UNDEFINED,
            fatal: true,
          });
          return;
        }

        const isUnique = await options.isUsernameUnique(val);
        if (!isUnique) {
          ctx.addIssue({
            code: "custom",
            message: "Username is already used",
          });
        }
      }),
    fullName: z.string().min(3).max(150),
  });
}


export const onboardingSchemaLocale = z.object({
  userName: z
    .string({ required_error: "Username required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(150, { message: "Username must be at most 150 characters" })
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username must contain only letters, numbers, and hyphens",
    }),
  fullName: z
    .string({ required_error: "Full Name required" })
    .min(3, { message: "Full Name must be at least 3 characters" })
    .max(150, { message: "Full Name must be at most 150 characters" }),
});


export const aboutSettingsSchema = z.object({
  fullName: z.string().min(3).max(150),

  profileImage: z.string(),
});

export const eventTypeSchema = z.object({
  title: z
    .string({ required_error: "Title required" })
    .min(3, { message: "Title must be at least 3 characters" })
    .max(150, { message: "Title must be at most 150 characters" }),

  duration: z
    .number({ required_error: "Duration required", invalid_type_error: "Duration must be a number" })
    .min(1, { message: "Duration must be at least 1 minute" })
    .max(100, { message: "Duration must be less than or equal to 100 minutes" }),

  url: z
    .string({ required_error: "URL required" })
    .min(3, { message: "URL must be at least 3 characters" })
    .max(150, { message: "URL must be at most 150 characters" }),

  description: z
    .string({ required_error: "Description required" })
    .min(3, { message: "Description must be at least 3 characters" })
    .max(300, { message: "Description must be at most 300 characters" }),

  videoCallSoftware: z
    .string({ required_error: "Video Call Software required" }),
});


export function EventTypeServerSchema(options?: {
  isUrlUnique: () => Promise<boolean>;
}) {
  return z.object({
    url: z
      .string()
      .min(3)
      .max(150)
      .pipe(
        // Note: The callback cannot be async here
        // As we run zod validation synchronously on the client
        z.string().superRefine((_, ctx) => {
          // This makes Conform to fallback to server validation
          // by indicating that the validation is not defined
          if (typeof options?.isUrlUnique !== "function") {
            ctx.addIssue({
              code: "custom",
              message: conformZodMessage.VALIDATION_UNDEFINED,
              fatal: true,
            });
            return;
          }

          // If it reaches here, then it must be validating on the server
          // Return the result as a promise so Zod knows it's async instead
          return options.isUrlUnique().then((isUnique) => {
            if (!isUnique) {
              ctx.addIssue({
                code: "custom",
                message: "Url is already used",
              });
            }
          });
        })
      ),
    title: z.string().min(3).max(150),
    duration: z.number().min(1).max(100),
    description: z.string().min(3).max(300),
    videoCallSoftware: z.string(),
  });
}
