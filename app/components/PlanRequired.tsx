"use client";

import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { ArrowLeft, CreditCard } from "lucide-react";

export default function PlanRequired() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full mx-4">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 relative w-20 h-20 flex items-center justify-center rounded-full bg-pink-100">
            <CreditCard className="h-10 w-10 text-pink-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Premium Feature</CardTitle>
          <CardDescription>
            This feature requires a paid subscription plan
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            To access this feature and many more, please upgrade to one of our premium plans.
            Our Pro and Plus plans include advanced scheduling features to help you manage your time more effectively.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button asChild className="w-full bg-pink-600 hover:bg-pink-700 text-white">
            <Link href="/Pricing">View Pricing Plans</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to Home</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}