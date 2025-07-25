"use client";

import { Check } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function SuccessPage() {
  return (
    <div className="h-screen w-screen  flex items-center justify-center bg-gradient-to-br from-[#FDEFF2] to-[#EAF6FF] py-[10%]">
      <Card className="max-w-5xl mx-auto bg-white border border-pink-100 shadow-md rounded-2xl">
        <CardContent className="p-6 flex flex-col w-full items-center text-center">
          <div className="w-16 h-16 bg-[#DDF6ED] rounded-full flex items-center justify-center shadow-sm">
            <Check className="w-8 h-8 text-green-500" />
          </div>
          <h1 className="text-2xl font-semibold mt-4 text-[#333]">
            Event Scheduled
          </h1>
          <p className="text-sm text-[#6B7280] mt-2">
            We've emailed you and the attendees a calendar invite with all the details.
          </p>
        </CardContent>
        <CardFooter className="px-6 pb-6">
          <Button
            className="w-full bg-pink-400 hover:bg-pink-500 text-white transition-colors duration-200"
            asChild
          >
            <Link href="/Dashboard">Close this Page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
