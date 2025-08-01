"use client";
import Link from "next/link";

export default function Header({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md ">
      <div className="container flex flex-col sm:flex-row justify-between items-center py-4 px-6">
        {/* Logo and Navigation */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link
            href="/"
            className="text-3xl font-extrabold text-pink-600 hover:text-pink-400 transition-colors duration-300"
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

        {/* Actions */}
        <div className="flex gap-4 mt-4 sm:mt-0">
          <button
            onClick={onOpenModal}
            className="px-5 py-2 text-sm font-semibold text-white bg-pink-600 rounded-full hover:bg-pink-500 transition-all duration-300 shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
}
