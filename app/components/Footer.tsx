"use client";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white border-t border-gray-200 py-3 px-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4 text-gray-600 text-sm ">
        <div className="font-semibold text-pink-600 text-lg select-none cursor-default">
          Calenara
        </div>

        <nav className="flex space-x-6">
          <a href="/About" className="hover:text-pink-500 transition-colors">
            About
          </a>
          <a href="/Features" className="hover:text-pink-500 transition-colors">
            Features
          </a>
          <a href="/Pricing" className="hover:text-pink-500 transition-colors">
            Pricing
          </a>
          <a href="/Privacy" className="hover:text-pink-500 transition-colors">
            Privacy & Policy
          </a>
        </nav>

        <div className="text-xs text-gray-400 select-none">
          &copy; {new Date().getFullYear()} Calenara. All rights reserved.
        </div>
      </div>
    </motion.footer>
  );
}
