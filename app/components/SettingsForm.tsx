"use client";
import { useActionState, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "@conform-to/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { SettingsAction } from "../action";
import { parseWithZod } from "@conform-to/zod";
import { SubmitButton } from "./SubmitBtn";
import { aboutSettingsSchema } from "../lib/zodSchemas";

interface iAppProps {
  fullName: string;
  email: string;
  profileImage: string;
}

export function SettingsForm({ email, fullName, profileImage }: iAppProps) {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(profileImage);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: aboutSettingsSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage("");
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="pb-2">
        <CardTitle className="text-3xl font-extrabold text-pink-600">
          Settings
        </CardTitle>
        <CardDescription className="text-pink-400">
          Manage your account settings.
        </CardDescription>
      </CardHeader>

      <form
        noValidate
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="space-y-6"
      >
        <CardContent className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-1">
            <Label className="text-pink-700 font-semibold">Full Name</Label>
            <Input
              name={fields.fullName.name}
              key={fields.fullName.key}
              placeholder="Your Full Name"
              defaultValue={fullName}
              className="border-pink-300 focus:ring-pink-400 focus:border-pink-400 bg-pink-100 text-pink-900 placeholder-pink-400 rounded-xl shadow-sm transition"
            />
            <p className="text-pink-600 text-sm italic">{fields.fullName.errors}</p>
          </div>

          <div className="flex flex-col gap-y-1">
            <Label className="text-pink-700 font-semibold">Email</Label>
            <Input
              disabled
              placeholder="youremail@example.com"
              defaultValue={email}
              className="border-pink-300 bg-pink-100 text-pink-700 rounded-xl shadow-inner"
            />
          </div>

          <div className="flex flex-col gap-y-3">
            <input
              type="hidden"
              name={fields.profileImage.name}
              key={fields.profileImage.key}
              value={currentProfileImage}
            />
            <Label className="text-pink-700 font-semibold">Profile Image</Label>

            {currentProfileImage ? (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden shadow-md border border-pink-300">
                <img
                  src={currentProfileImage}
                  alt="Profile"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                />
                <Button
                  type="button"
                  onClick={handleDeleteImage}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 bg-pink-600 hover:bg-pink-700 shadow-lg"
                >
                  <X className="w-4 h-4 text-white" />
                </Button>
              </div>
            ) : (
              <div className="w-40 h-40 rounded-xl bg-pink-200 flex items-center justify-center text-pink-500 font-medium shadow-inner">
                No image
              </div>
            )}

            <p className="text-pink-600 text-sm italic">{fields.profileImage.errors}</p>
          </div>
        </CardContent>

        <CardFooter>
          <SubmitButton
            text="Save Changes"
            className="bg-pink-500 hover:bg-pink-600 text-white shadow-lg rounded-xl transition"
          />
        </CardFooter>
      </form>
    </Card>
  );
}
