"use client";

import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

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
