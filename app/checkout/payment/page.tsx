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
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Calendar,
  Lock,
} from "lucide-react";
import Link from "next/link";

export default function PaymentPage({
  searchParams,
}: {
  searchParams: { plan: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    zipCode: "",
    country: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if user is authenticated
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((session) => {
        if (!session?.user) {
          router.push(`/checkout?plan=${searchParams.plan}`);
        }
      });
  }, [searchParams.plan, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.cardNumber.trim() || formData.cardNumber.length < 16) {
      newErrors.cardNumber = "Valid card number is required";
    }

    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required";
    }

    if (
      !formData.expiryDate.trim() ||
      !/^\d{2}\/\d{2}$/.test(formData.expiryDate)
    ) {
      newErrors.expiryDate = "Valid expiry date (MM/YY) is required";
    }

    if (!formData.cvv.trim() || formData.cvv.length < 3) {
      newErrors.cvv = "Valid CVV is required";
    }

    if (!formData.billingAddress.trim()) {
      newErrors.billingAddress = "Billing address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Store payment details in session storage for the next step
    sessionStorage.setItem("paymentDetails", JSON.stringify(formData));

    // Navigate to confirmation page
    router.push(`/checkout/confirmation?plan=${searchParams.plan}`);
  };

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    setFormData((prev) => ({ ...prev, cardNumber: formatCardNumber(value) }));
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setFormData((prev) => ({ ...prev, expiryDate: value }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 bg-pink-50 rounded-2xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <Link
            href={`/checkout?plan=${searchParams.plan}`}
            className="flex items-center text-sm text-pink-600 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Plan Selection
          </Link>
          <div className="text-sm text-pink-500">
            Step 2 of 3: Payment Details
          </div>
        </div>
        <div className="w-full bg-pink-100 h-2 rounded-full">
          <div
            className="bg-pink-400 h-2 rounded-full transition-all duration-300"
            style={{ width: "66.6%" }}
          ></div>
        </div>
      </div>

      <Card className="bg-white  border-dashed border-pink-400 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-pink-700">
            Payment Information
          </CardTitle>
          <CardDescription className="text-pink-400">
            Enter your payment details securely
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-pink-600">
                Card Information
              </h3>

              {/* Grid: Card Number & Name */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="cardNumber" className="text-pink-600">
                    Card Number
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 h-5 w-5" />
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="pl-10 focus:ring-pink-300"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                    />
                  </div>
                  {errors.cardNumber && (
                    <p className="text-red-500 text-xs">{errors.cardNumber}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cardholderName" className="text-pink-600">
                    Cardholder Name
                  </Label>
                  <Input
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="John Doe"
                    className="focus:ring-pink-300"
                    value={formData.cardholderName}
                    onChange={handleChange}
                  />
                  {errors.cardholderName && (
                    <p className="text-red-500 text-xs">
                      {errors.cardholderName}
                    </p>
                  )}
                </div>
              </div>

              {/* Grid: Expiry & CVV */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="expiryDate" className="text-pink-600">
                    Expiry Date
                  </Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 h-5 w-5" />
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      className="pl-10 focus:ring-pink-300"
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange}
                    />
                  </div>
                  {errors.expiryDate && (
                    <p className="text-red-500 text-xs">{errors.expiryDate}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="cvv" className="text-pink-600">
                    CVV
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300 h-5 w-5" />
                    <Input
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      className="pl-10 focus:ring-pink-300"
                      maxLength={4}
                      value={formData.cvv}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFormData((prev) => ({ ...prev, cvv: value }));
                      }}
                    />
                  </div>
                  {errors.cvv && (
                    <p className="text-red-500 text-xs">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-pink-600">
                Billing Info
              </h3>

              <div className="space-y-1">
                <Label htmlFor="billingAddress" className="text-pink-600">
                  Address
                </Label>
                <Input
                  id="billingAddress"
                  name="billingAddress"
                  placeholder="123 Main St"
                  className="focus:ring-pink-300"
                  value={formData.billingAddress}
                  onChange={handleChange}
                />
                {errors.billingAddress && (
                  <p className="text-red-500 text-xs">
                    {errors.billingAddress}
                  </p>
                )}
              </div>

              {/* Grid: City & ZIP */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="city" className="text-pink-600">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="New York"
                    className="focus:ring-pink-300"
                    value={formData.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs">{errors.city}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <Label htmlFor="zipCode" className="text-pink-600">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    name="zipCode"
                    placeholder="10001"
                    className="focus:ring-pink-300"
                    value={formData.zipCode}
                    onChange={handleChange}
                  />
                  {errors.zipCode && (
                    <p className="text-red-500 text-xs">{errors.zipCode}</p>
                  )}
                </div>
              </div>

              {/* Country */}
              <div className="space-y-1">
                <Label htmlFor="country" className="text-pink-600">
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="United States"
                  className="focus:ring-pink-300"
                  value={formData.country}
                  onChange={handleChange}
                />
                {errors.country && (
                  <p className="text-red-500 text-xs">{errors.country}</p>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between mt-4">
            <Button
              variant="outline"
              className="text-pink-600 border-pink-300 hover:bg-pink-100"
              type="button"
              asChild
            >
              <Link href={`/checkout?plan=${searchParams.plan}`}>Back</Link>
            </Button>
            <Button
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin h-4 w-4 mr-2 border-t-2 border-white rounded-full" />
                  Processing...
                </div>
              ) : (
                <span className="flex items-center">
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
