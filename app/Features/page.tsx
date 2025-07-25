"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SignupModal } from "../components/SignupModal";
import Features from "./Features";

export default function PrivacyPolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative">
      <Header onOpenModal={() => setIsModalOpen(true)} />
        <Features/>
      <Footer />
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        callbackUrl="/Dashboard"
      />
    </div>
  );
}
