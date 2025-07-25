"use client";

import Image from "next/image";
// import HeroImage from "@/public/your-image.png"; // Uncomment if using an image

export default function About() {
  return (
    <div>
      <section className="relative flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
          {/* Background SVG */}
          <div
            className="absolute inset-0 pointer-events-none -z-10 blur-3xl"
            aria-hidden="true"
          >
            <svg
              className="w-full h-full"
              fill="none"
              viewBox="0 0 400 400"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <g filter="url(#filter0_f)">
                  <path d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z" fill="#a5f3fc" />
                  <path d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z" fill="#fbcfe8" />
                  <path d="M320 400H400V78.75L106.2 134.75L320 400Z" fill="#bae6fd" />
                  <path d="M400 0H128.6L106.2 134.75L400 78.75V0Z" fill="#f0abfc" />
                </g>
              </g>
              <defs>
                <filter id="filter0_f" x="-160" y="-160" width="720" height="720">
                  <feGaussianBlur stdDeviation="80" />
                </filter>
                <clipPath id="clip0">
                  <rect width="400" height="400" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Tagline */}
          <div className="text-center">
            <span className="inline-block text-sm font-medium text-pink-600 bg-pink-100/50 px-4 py-2 rounded-full shadow-sm">
              Introducing CaleNara 1.0
            </span>

            <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900">
              Scheduling made{" "}
              <span className="block text-pink-600">super easy</span>
            </h1>

            <p className="mt-6 max-w-xl mx-auto text-base sm:text-lg text-muted-foreground">
              Scheduling a meeting can be a pain. CalMarshal makes it
              beautifully easy for your clients to find your availability and book you.
            </p>
          </div>

          {/* Hero Image (optional) */}
          {/* <div className="mt-16">
            <Image
              src={HeroImage}
              alt="Hero illustration"
              priority
              className="mx-auto rounded-2xl border shadow-lg"
            />
          </div> */}
        </div>
      </section>
    </div>
  );
}
