import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Check } from "lucide-react";
import Link from "next/link";
import { auth } from "../lib/auth";

export default async function PricingPage() {
  const session = await auth();
  
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Basic features for personal use",
      features: [
        "Access to home page",
        "View features page",
        "View pricing page"
      ],
      buttonText: session?.user ? "Current Plan" : "Get Started",
      buttonLink: session?.user ? "/dashboard" : "/",
      highlighted: false,
      planType: "FREE"
    },
    {
      name: "Pro",
      price: "$10",
      description: "Advanced features for professionals",
      features: [
        "All Free features",
        "Login with OAuth",
        "Create event types",
        "Manage availability",
        "Booking page"
      ],
      buttonText: "Upgrade to Pro",
      // Direct to the first step of checkout process
      buttonLink: "/checkout?plan=pro",
      highlighted: true,
      planType: "PRO"
    },
    {
      name: "Plus",
      price: "$20",
      description: "Premium features for teams",
      features: [
        "All Pro features",
        "Team scheduling",
        "Advanced integrations",
        "Priority support",
        "Custom branding"
      ],
      buttonText: "Upgrade to Plus",
      // Direct to the first step of checkout process
      buttonLink: "/checkout?plan=plus",
      highlighted: false,
      planType: "PLUS"
    }
  ];

  return (
    <div className="container py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Choose the plan that is right for you and start managing your schedule efficiently.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-8">
        {plans.map((plan) => (
          <Card key={plan.name} className={`flex flex-col ${plan.highlighted ? 'border-pink-500 shadow-lg' : ''}`}>
            <CardHeader>
              <CardTitle className="text-2xl">{plan.name}</CardTitle>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.price !== "$0" && <span className="text-gray-500">/month</span>}
              </div>
              <CardDescription className="mt-3">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                asChild 
                className={`w-full ${plan.highlighted ? 'bg-pink-600 hover:bg-pink-700 text-white' : ''}`}
              >
                <Link href={plan.buttonLink}>{plan.buttonText}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}