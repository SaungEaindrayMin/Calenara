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
    .string()
    .min(3)
    .max(150)
    .regex(/^[a-zA-Z0-9-]+$/, {
      message: "Username must contain only letters, numbers, and hyphens",
    }),
  fullName: z.string().min(3).max(150),
});

export const aboutSettingsSchema = z.object({
  fullName: z.string().min(3).max(150),

  profileImage: z.string(),
});

export const eventTypeSchema = z.object({
  title: z.string().min(3).max(150),
  duration: z.number().min(1).max(100),
  url: z.string().min(3).max(150),
  description: z.string().min(3).max(300),
  videoCallSoftware: z.string(),
});
