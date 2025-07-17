"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { CheckCircle2, Home, Calendar } from "lucide-react";
import Link from "next/link";
import { SignupModal } from "@/app/components/SignupModal";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { plan: string };
}) {
  const router = useRouter();
  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(session => {
        if (session?.user) {
          setIsAuthenticated(true);
        } else {
          // If not authenticated, show signup modal
          setIsSignupModalOpen(true);
        }
      });
      
    // Fetch plan details
    const planType = searchParams.plan?.toUpperCase();
    if (!planType || !['PRO', 'PLUS'].includes(planType)) {
      router.push("/pricing");
      return;
    }
    
    fetch(`/api/plans?type=${planType}`)
      .then(res => res.json())
      .then(data => {
        if (data.plan) {
          setPlan(data.plan);
        } else {
          router.push("/pricing?error=plan_not_found");
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching plan:", err);
        router.push("/pricing?error=plan_not_found");
        setLoading(false);
      });
  }, [searchParams.plan, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#fef6fb]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  return (
    <div className="container max-w-md py-12">
      <Card className="text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl">Purchase Successful!</CardTitle>
          <CardDescription>
            Thank you for upgrading to the {plan?.name} plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Your account has been successfully upgraded to the {plan?.name} plan. You now have access to all the premium features included in your subscription.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Your subscription includes:</h3>
            <ul className="space-y-2 text-left">
              {plan?.features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {!isAuthenticated && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800 mb-2">
                Please sign in to access your upgraded account.
              </p>
              <Button 
                onClick={() => setIsSignupModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Sign In Now
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="outline" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" /> Home
            </Link>
          </Button>
          {isAuthenticated && (
            <Button className="bg-pink-600 hover:bg-pink-700 " asChild>
              <Link href="/Dashboard" className="text-white">
                <Calendar className="mr-2 h-4 w-4 text-white" /> Go to Dashboard
              </Link>
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
        callbackUrl="/Dashboard" 
      />
    </div>
  );
}