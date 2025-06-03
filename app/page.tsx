// app/page.tsx or wherever your Home component is
"use client";

import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import { SignupModal } from "./components/SignupModal";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session?.user){
    return redirect("/Dashboard");
  }
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative">
      <Header onOpenModal={() => setIsModalOpen(true)} />
      <Hero />
      <Footer />
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
