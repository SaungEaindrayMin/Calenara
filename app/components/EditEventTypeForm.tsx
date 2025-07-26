"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { eventTypeSchema } from "@/app/lib/zodSchemas";

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
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ButtonGroup } from "./ui/ButtonGroup";
import { Button } from "./ui/button";
import { SubmitButton } from "./SubmitBtn";
import { EditEventTypeAction } from "../action";

interface iAppProps {
  id: string;
  title: string;
  url: string;
  description: string;
  duration: number;
  callProvider: string;
}

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

export function EditEventTypeForm({
  description,
  duration,
  title,
  url,
  callProvider,
  id,
}: iAppProps) {
  const [lastResult, action] = useActionState(EditEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [activePlatform, setActivePlatform] = useState<Platform>(
    callProvider as Platform
  );
  const togglePlatform = (platform: Platform) => setActivePlatform(platform);

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6 rounded-2xl shadow-sm">
      <Card className="w-full border border-dashed border-pink-200 rounded-2xl bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Edit Appointment Type
          </CardTitle>
          <CardDescription className="text-gray-600">
            Update your appointment type details here.
          </CardDescription>
        </CardHeader>

        <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
          <input type="hidden" name="id" value={id} />
          <CardContent className="grid gap-6">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                name={fields.title.name}
                key={fields.title.key}
                defaultValue={title}
                placeholder="30 min meeting"
                className="bg-white border border-pink-200 focus:ring-2 focus:ring-pink-300"
              />
              <p className="text-sm text-red-500">{fields.title.errors}</p>
            </div>

            {/* URL Slug */}
            <div className="flex flex-col gap-2">
              <Label>URL Slug</Label>
              <div className="flex overflow-hidden rounded-md border border-blue-200 bg-white">
                <span className="inline-flex items-center px-3 bg-[#d7e8f8] text-sm text-gray-700">
                  CalMarshal.com/
                </span>
                <Input
                  type="text"
                  key={fields.url.key}
                  defaultValue={url}
                  name={fields.url.name}
                  placeholder="example-user-1"
                  className="border-0 rounded-l-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <p className="text-sm text-red-500">{fields.url.errors}</p>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Textarea
                name={fields.description.name}
                key={fields.description.key}
                defaultValue={description}
                placeholder="30 min meeting"
                className="bg-white border border-pink-200 focus:ring-2 focus:ring-pink-300"
              />
              <p className="text-sm text-red-500">
                {fields.description.errors}
              </p>
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-2">
              <Label>Duration</Label>
              <Select
                name={fields.duration.name}
                key={fields.duration.key}
                defaultValue={String(duration)}
              >
                <SelectTrigger className="bg-white border border-blue-200 focus:ring-2 focus:ring-blue-300">
                  <SelectValue placeholder="Select the duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Duration</SelectLabel>
                    <SelectItem value="15">15 Mins</SelectItem>
                    <SelectItem value="30">30 Mins</SelectItem>
                    <SelectItem value="45">45 Mins</SelectItem>
                    <SelectItem value="60">1 Hour</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <p className="text-sm text-red-500">{fields.duration.errors}</p>
            </div>

            {/* Platform */}
            <div className="flex flex-col gap-2">
              <input
                type="hidden"
                name={fields.videoCallSoftware.name}
                value={activePlatform}
              />
              <Label>Video Call Provider</Label>
              <ButtonGroup className="w-full">
                {(
                  [
                    "Zoom Meeting",
                    "Google Meet",
                    "Microsoft Teams",
                  ] as Platform[]
                ).map((platform) => (
                  <Button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    type="button"
                    className={`w-full ${
                      activePlatform === platform
                        ? "bg-pink-200 text-black hover:bg-pink-300"
                        : "border border-gray-300 bg-white hover:bg-gray-100"
                    }`}
                  >
                    {platform
                      .replace(" Meeting", "")
                      .replace("Microsoft ", "MS ")}
                  </Button>
                ))}
              </ButtonGroup>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between">
            <Button asChild variant="outline">
              <Link href="/Dashboard">Cancel</Link>
            </Button>
            <SubmitButton
              text="Update Event Type"
              className="bg-pink-500 hover:bg-pink-400 text-white mt-3"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
