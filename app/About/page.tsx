"use client";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { SignupModal } from "../components/SignupModal";
import About from "./About";
import { TestimonialList } from "./Testimonial";
import { Team } from "./Team";
import { CoreValues } from "./CoreValue";
import { CTA } from "./CTA";

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="relative">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <About />
      <Team />
      <CoreValues />
      <TestimonialList />
      <CTA  onOpenModal={() => setIsModalOpen(true)}  />
      <Footer />
      <SignupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        callbackUrl="/Dashboard"
      />
    </div>
  );
}
