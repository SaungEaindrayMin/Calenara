"use client";
import { CreateEventTypeAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitBtn";
import { Button } from "@/app/components/ui/button";
import { ButtonGroup } from "@/app/components/ui/ButtonGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { eventTypeSchema } from "@/app/lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import Link from "next/link";
import React, { useActionState, useState } from "react";

type Platform = "Zoom Meeting" | "Google Meet" | "Microsoft Teams";

const CreateNewEvent = () => {
  const [lastResult, action] = useActionState(CreateEventTypeAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: eventTypeSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const [activePlatform, setActivePlatform] = useState<Platform>("Google Meet");

  const togglePlatform = (platform: Platform) => {
    setActivePlatform(platform);
  };

  return (
<div className="bg-gradient-to-br from-pink-50 via-white to-blue-50   rounded-2xl">
  <Card className="w-full border border-dashed border-pink-200 rounded-2xl bg-white/80 ">
    <CardHeader>
      <CardTitle className="text-2xl font-semibold text-gray-800">Add New Appointment Type</CardTitle>
      <CardDescription className="text-gray-600">
        Create a new appointment type that allows people to book times.
      </CardDescription>
    </CardHeader>

    <form noValidate id={form.id} onSubmit={form.onSubmit} action={action}>
      <CardContent className="grid gap-6">
        {/* Title */}
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            name={fields.title.name}
            key={fields.title.key}
            defaultValue={fields.title.initialValue}
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
              CaleNara.com/
            </span>
            <Input
              type="text"
              key={fields.url.key}
              defaultValue={fields.url.initialValue}
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
            defaultValue={fields.description.initialValue}
            placeholder="30 min meeting"
            className="bg-white border border-pink-200 focus:ring-2 focus:ring-pink-300"
          />
          <p className="text-sm text-red-500">{fields.description.errors}</p>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <Label>Duration</Label>
          <Select
            name={fields.duration.name}
            key={fields.duration.key}
            defaultValue={fields.duration.initialValue}
          >
            <SelectTrigger className="bg-white border border-blue-200 focus:ring-2 focus:ring-blue-300">
              <SelectValue placeholder="Select the duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Duration</SelectLabel>
                <SelectItem value="15">15 Mins</SelectItem>
                <SelectItem value="30">30 Min</SelectItem>
                <SelectItem value="45">45 Mins</SelectItem>
                <SelectItem value="60">1 Hour</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <p className="text-sm text-red-500">{fields.duration.errors}</p>
        </div>

        {/* Video Call Platform */}
        <div className="flex flex-col gap-2">
          <input
            type="hidden"
            name={fields.videoCallSoftware.name}
            value={activePlatform}
          />
          <Label>Video Call Provider</Label>
          <ButtonGroup className="w-full">
            {(["Zoom Meeting", "Google Meet", "Microsoft Teams"] as Platform[]).map((platform) => (
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
                {platform.replace(" Meeting", "").replace("Microsoft ", "MS ")}
              </Button>
            ))}
          </ButtonGroup>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button asChild variant="outline">
          <Link href="/Dashboard">Cancel</Link>
        </Button>
        <SubmitButton text="Create Event Type" className="bg-pink-500 hover:bg-pink-400 text-white mt-3" />
      </CardFooter>
    </form>
  </Card>
</div>

  );
};

export default CreateNewEvent;
