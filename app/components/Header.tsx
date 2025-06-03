// components/Header.tsx
"use client";
import Link from "next/link";

export default function Header({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <header className="container flex flex-col sm:flex-row justify-between items-center py-6 bg-white/70 backdrop-blur-lg rounded-2xl px-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <Link
          href="/"
          className="text-3xl font-extrabold text-pink-600 hover:text-babypink transition-colors duration-300"
        >
          Calenara
        </Link>
        <nav className="hidden sm:flex gap-8 text-gray-600 text-base font-medium">
          <Link
            href="/Features"
            className="hover:text-pink-600 transition-colors duration-300"
          >
            Features
          </Link>
          <Link
            href="/About"
            className="hover:text-pink-600 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/Pricing"
            className="hover:text-pink-600 transition-colors duration-300"
          >
            Pricing
          </Link>
        </nav>
      </div>

      <div className="flex gap-4 mt-4 sm:mt-0">
        <Link
          href="/signin"
          className="px-5 py-2 text-sm font-semibold text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          Sign in
        </Link>
        <button
          onClick={onOpenModal}
          className="px-5 py-2 text-sm font-semibold text-white bg-pink-600 rounded-full hover:bg-babyblue hover:text-secondary transition-all duration-300 shadow-sm"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}
