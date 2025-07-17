"use client";

import { useSearchParams } from "next/navigation";
import { SignupModal } from "@/app/components/SignupModal";
import { useEffect, useState } from "react";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    // Automatically open the sign-in modal when the page loads
    setIsOpen(true);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Sign in to continue</h1>
        <p className="text-gray-600 mb-6">You need to sign in to complete your purchase</p>
        <SignupModal 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          callbackUrl={callbackUrl}
        />
        <button 
          onClick={() => setIsOpen(true)}
          className="mt-4 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
        >
          Sign in
        </button>
      </div>
    </div>
  );
}