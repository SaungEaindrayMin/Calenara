import React from "react";
import Link from "next/link";
import { CalendarCheck2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";

const GrantIdRoute = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-pink-50 px-4 py-12">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-md border border-pink-200 rounded-3xl shadow-2xl transition-all duration-300">
        <CardHeader className="text-center pt-8">
          <CardTitle className="text-3xl font-semibold text-pink-600">
            🌸 You're Almost Done!
          </CardTitle>
          <CardDescription className="text-pink-500 text-sm mt-2 px-6">
            Connect your calendar to unlock scheduling features and finish onboarding.
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-8 mt-4">
          <Button
            asChild
            className="w-full bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium py-2.5 rounded-xl shadow-lg transition duration-300"
          >
            <Link href="/api/auth" className="flex items-center justify-center gap-2">
              <CalendarCheck2 className="size-5" />
              Connect Calendar
            </Link>
          </Button>

          <p className="text-center text-xs text-pink-400 mt-3">
            Your data is secure. We never access your private events.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrantIdRoute;
