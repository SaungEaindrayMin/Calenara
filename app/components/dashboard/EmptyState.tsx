import { Ban, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface iAppProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({
  buttonText,
  description,
  href,
  title,
}: iAppProps) {
  return (
    <div className="flex flex-col flex-1 h-full items-center justify-center rounded-2xl border border-dashed border-pink-200 p-10 text-center bg-gradient-to-br from-pink-50 via-white to-blue-50 animate-in fade-in-50 transition-all duration-300">
      
      <div className="flex size-20 items-center justify-center rounded-full bg-gradient-to-tr from-pink-100 to-blue-100 shadow-inner">
        <Ban className="size-10 text-pink-400" />
      </div>
      
      <h2 className="mt-6 text-2xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 text-transparent bg-clip-text">
        {title}
      </h2>
      
      <p className="mb-8 mt-3 text-center text-sm leading-relaxed text-pink-500 max-w-sm mx-auto">
        {description}
      </p>

      <Button
        asChild
        className="bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 text-white font-semibold px-5 py-2 rounded-lg shadow hover:shadow-md transition-all mt-2"
      >
        <Link href={href}>
          <PlusCircle className="mr-2 size-4" /> {buttonText}
        </Link>
      </Button>
    </div>
  );
}
