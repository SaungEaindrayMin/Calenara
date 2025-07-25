// app/components/HomeClient.tsx
"use client";

import { useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import { SignupModal } from "./SignupModal";

export default function HomeClient() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero />
      <Footer />
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} callbackUrl="/Dashboard" />
    </div>
  );
}
