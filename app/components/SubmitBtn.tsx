"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

interface iAppProps {
  text: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;

  className?: string;
}

export function SubmitButton({ text, variant, className }: iAppProps) {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled variant="outline" className={cn("w-fit", className)}>
          <Loader2 className="size-4 mr-2 animate-spin" /> Please wait
        </Button>
      ) : (
        <Button
          variant={variant}
          type="submit"
          className={cn("w-fit", className)}
        >
          {text}
        </Button>
      )}
    </>
  );
}

export function GoogleBtn({ action }: { action: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => action())}
      disabled={isPending}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium
        ${isPending ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-100 border"}
      `}
    >
      {isPending ? (
        <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
      ) : (
        <>
        <FcGoogle className="h-5 w-5" />
          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}

export function GithubBtn({ action }: { action: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      type="button"
      onClick={() => startTransition(() => action())}
      disabled={isPending}
      className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium
        ${isPending ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white text-gray-800 hover:bg-gray-100 border"}
      `}
    >
      {isPending ? (
        <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
      ) : (
        <>
        <FaGithub className="h-5 w-5 text-gray-800" />
          <span>Continue with GitHub</span>
        </>
      )}
    </button>
  );
}
