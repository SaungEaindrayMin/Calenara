"use client";

import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { GithubBtn, GoogleBtn } from "./SubmitBtn";
import { FaCalendarDays } from "react-icons/fa6";

export function SignupModal({
  isOpen,
  onClose,
  callbackUrl = "/dashboard",
}: {
  isOpen: boolean;
  onClose: () => void;
  callbackUrl?: string;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-8 space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className="flex justify-center items-center gap-3 mb-4">
                  <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
                    Start Your Journey with <span className="text-pink-600">Calenara</span>
                  </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Join using your favorite account
                </p>
              </div>

              {/* Auth Buttons */}
              <div className="space-y-3">
                <GoogleBtn action={() => signIn("google", { callbackUrl })} />
                <GithubBtn action={() => signIn("github", { callbackUrl })} />
              </div>

              {/* Optional close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
