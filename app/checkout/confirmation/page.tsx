"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { ArrowLeft, Check, CreditCard, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function ConfirmationPage({
  searchParams,
}: {
  searchParams: { plan: string };
}) {
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        if (!session?.user) {
          router.push(`/checkout?plan=${searchParams.plan}`);
          return;
        }

        const storedPaymentDetails = sessionStorage.getItem("paymentDetails");
        if (!storedPaymentDetails) {
          router.push(`/checkout/payment?plan=${searchParams.plan}`);
          return;
        }

        setPaymentDetails(JSON.parse(storedPaymentDetails));

        fetch(`/api/plans?type=${searchParams.plan.toUpperCase()}`)
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
          });
      });
  }, [searchParams.plan, router]);

  const handleCompletePurchase = async () => {
    setProcessing(true);

    try {
      const response = await fetch("/api/checkout/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          paymentDetails: paymentDetails,
        }),
      });

      if (response.ok) {
        sessionStorage.removeItem("paymentDetails");
        router.push(`/checkout/success?plan=${searchParams.plan}`);
      } else {
        const data = await response.json();
        alert(`Payment failed: ${data.error || "Unknown error"}`);
        setProcessing(false);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred while processing your payment.");
      setProcessing(false);
    }
  };

  if (loading || !plan || !paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
      </div>
    );
  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fef6fb] px-4 py-12">
      <div className="w-full max-w-2xl space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <Link
              href={`/checkout/payment?plan=${searchParams.plan}`}
              className="flex items-center text-sm text-pink-500 hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Payment
            </Link>
            <div className="text-sm text-gray-400">
              Step 3 of 3: Confirmation
            </div>
          </div>
          <div className="w-full bg-[#f8e4ef] h-2 rounded-full">
            <div
              className="bg-pink-400 h-2 rounded-full"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>

        <Card className="bg-white border border-dashed border-pink-400 rounded-xl ">
          <CardHeader>
            <CardTitle className="text-2xl text-pink-600">
              Review Your Order
            </CardTitle>
            <CardDescription className="text-blue-400">
              Please confirm your purchase details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 text-sm">
              {/* Plan Details */}
              <div className="bg-pink-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3 text-pink-500">
                  Plan Details
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Plan:</span>
                    <span className="font-medium">{plan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-medium">${plan.price}/month</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-1 text-blue-500">
                      Features:
                    </h4>
                    <ul className="space-y-1">
                      {plan.features.map((feature: string) => (
                        <li key={feature} className="flex items-center gap-2">
                          <Check className="h-4 w-4 text-green-400" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-3 text-blue-500">
                  Payment Information
                </h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gray-500" />
                    <span>
                      Card ending in {paymentDetails.cardNumber.slice(-4)}
                    </span>
                  </div>
                  <div className="pl-7 text-sm text-gray-500">
                    {paymentDetails.cardholderName}
                  </div>
                  <div className="pt-2">
                    <h4 className="font-medium mb-1 text-blue-400">
                      Billing Address:
                    </h4>
                    <address className="not-italic pl-7 text-gray-600">
                      {paymentDetails.billingAddress}
                      <br />
                      {paymentDetails.city}, {paymentDetails.zipCode}
                      <br />
                      {paymentDetails.country}
                    </address>
                  </div>
                </div>
              </div>

              {/* Secure Message */}
              <div className="bg-green-50 p-4 rounded-lg flex items-start gap-3">
                <ShieldCheck className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800">
                    Secure Transaction
                  </h3>
                  <p className="text-sm text-green-700">
                    Your payment information is encrypted and secure. We do not
                    store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col-reverse sm:flex-row justify-between gap-4 sm:gap-0">
            <Button
              variant="outline"
              asChild
              className="border-pink-300 text-pink-500 hover:bg-pink-50 w-full sm:w-auto"
            >
              <Link href={`/checkout/payment?plan=${searchParams.plan}`}>
                Back
              </Link>
            </Button>
            <Button
              className="bg-pink-400 hover:bg-pink-500 text-white w-full sm:w-auto"
              onClick={handleCompletePurchase}
              disabled={processing}
            >
              {processing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                "Complete Purchase"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
