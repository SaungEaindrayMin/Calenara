"use client";
import React, { useActionState } from "react";
import { useFormState } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaLocale } from "../lib/zodSchemas";
import { useForm } from "@conform-to/react";
import { onboardingAction } from "../action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { SubmitButton } from "../components/SubmitBtn";

const OnboardingPage = () => {
  const [lastResult, action] = useActionState(onboardingAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchemaLocale });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="min-h-screen  flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg border border-pink-200 shadow-2xl rounded-3xl overflow-hidden">
        <CardHeader className="text-center py-8">
          <CardTitle className="text-3xl font-bold text-pink-600">
            🎀 Welcome to Calenara
          </CardTitle>
          <CardDescription className="text-pink-500 text-base mt-2">
            Let’s get your profile set up ✨
          </CardDescription>
        </CardHeader>

        <form
          id={form.id}
          onSubmit={form.onSubmit}
          action={action}
          noValidate
        >
          <CardContent className="flex flex-col gap-6 px-8">
            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <Label className="text-pink-700 text-sm font-medium">
                Full Name
              </Label>
              <Input
                name={fields.fullName.name}
                defaultValue={fields.fullName.initialValue}
                key={fields.fullName.key}
                placeholder="Saung Eaindray Min"
                className="bg-white border border-pink-300 focus:ring-2 focus:ring-pink-300 focus:border-pink-400 rounded-lg px-4 py-2 text-sm"
              />
              {fields.fullName.errors && (
                <p className="text-sm text-red-500">{fields.fullName.errors}</p>
              )}
            </div>

            {/* Username */}
            <div className="flex flex-col gap-1">
              <Label className="text-pink-700 text-sm font-medium">
                Username
              </Label>
              <div className="flex rounded-lg overflow-hidden border border-pink-300 bg-white">
                <span className="inline-flex items-center px-3 text-sm text-pink-500 bg-pink-100 border-r border-pink-300">
                  CaleNara.com/
                </span>
                <Input
                  type="text"
                  key={fields.userName.key}
                  defaultValue={fields.userName.initialValue}
                  name={fields.userName.name}
                  placeholder="example-user-1"
                  className="w-full px-4 py-2 bg-white text-sm focus:ring-2 focus:ring-pink-300 focus:border-pink-400"
                />
              </div>
              {fields.userName.errors && (
                <p className="text-sm text-red-500">{fields.userName.errors}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="px-8 pb-8 pt-4">
            <SubmitButton
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-medium text-sm shadow-md transition-all duration-300"
              text="✨ Submit"
            />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingPage;
