"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Check, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SignupModal } from "@/app/components/SignupModal";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planType = searchParams.get("plan")?.toUpperCase();

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        if (session?.user) {
          setIsAuthenticated(true);
        } else {
          setIsSignupModalOpen(true);
        }
      });

    if (!planType || !["PRO", "PLUS"].includes(planType)) {
      router.push("/pricing");
      return;
    }

    fetch(`/api/plans?type=${planType}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.plan) {
          setPlan(data.plan);
        } else {
          router.push("/pricing?error=plan_not_found");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching plan:", err);
        router.push("/pricing?error=plan_not_found");
        setLoading(false);
      });
  }, [planType, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fef6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  if (!plan) return null;

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#fef6fb] px-4">
      <div className="w-full max-w-2xl bg-[#fef6fb] rounded-2xl p-6 shadow-lg">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Link
              href="/pricing"
              className="flex items-center text-sm text-pink-500 hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to pricing
            </Link>
            <div className="text-sm text-gray-400">
              Step 1 of 3: Plan Selection
            </div>
          </div>
          <div className="w-full bg-[#f8e4ef] h-2 rounded-full">
            <div
              className="bg-pink-400 h-2 rounded-full"
              style={{ width: "33.3%" }}
            ></div>
          </div>
        </div>

        <Card className="bg-white border border-dashed border-pink-400 rounded-xl ">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-600">
              Confirm Your Plan
            </CardTitle>
            <CardDescription className="text-blue-400">
              Review your selected plan before proceeding to payment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-pink-500">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price:</span>
                <span className="font-medium text-pink-500">
                  ${plan.price}/month
                </span>
              </div>
              <div className="pt-4">
                <h3 className="font-medium text-blue-500 mb-2">
                  Features included:
                </h3>
                <ul className="space-y-2">
                  {plan.features.map((feature: string) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <Check className="h-4 w-4 text-green-400" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              className="border-pink-300 text-pink-500 hover:bg-pink-50"
              asChild
            >
              <Link href="/pricing">Cancel</Link>
            </Button>
            <Button
              className="bg-pink-400 hover:bg-pink-500 text-white shadow-md"
              asChild
            >
              <Link href={`/checkout/payment?plan=${planType}`}>
                Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={() => setIsSignupModalOpen(false)}
          callbackUrl={`/checkout?plan=${planType}`}
        />
      </div>
    </div>
  );
}
