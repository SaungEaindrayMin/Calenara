"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-[5%]">
      <div className="flex flex-col items-center w-full mx-auto text-center bg-gradient-to-b from-white via-blue-100 to-pink-50 py-16 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-extrabold leading-snug tracking-tight text-gray-900"
        >
          Most apps are basic{" "}
          <span className="relative inline-block">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute bottom-1 left-0 h-2 bg-pink-200 rounded-md"
              style={{ zIndex: -1 }}
            />
            <span className="relative bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              ours is seamless..
            </span>
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-xl md:text-2xl font-medium text-gray-600"
        >
          Designed for people like you.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-8 text-base md:text-lg text-gray-500 max-w-2xl"
        >
          While most scheduling apps offer a basic and functional experience,
          our platform goes beyond — providing a smoother, smarter, and more
          intuitive interface that makes scheduling effortless. Oh, and it's
          open-source — feel free to explore the code yourself.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex gap-4 mt-8"
        >
          <Link
            href="/details"
            className="px-5 py-2 rounded-full bg-pink-400 text-white font-medium hover:bg-pink-700 transition duration-300 shadow-md"
          >
            More Details
          </Link>

          <Link
            href="/pricing"
            className="px-5 py-2 rounded-full bg-blue-400 text-white font-medium hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Pricing
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
