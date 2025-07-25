"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PrivacyPage from "./Privacy";
import { SignupModal } from "../components/SignupModal";

export default function PrivacyPolicy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <PrivacyPage />
      <Footer />
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        callbackUrl="/Dashboard"
      />
    </div>
  );
}
