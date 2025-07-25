"use client";

import { CloudRain, Lock, Rocket, ThumbsUp } from "lucide-react";

const features = [
  {
    name: "Free to use",
    description: "Start scheduling with zero setup or commitment.",
    icon: ThumbsUp,
  },
  {
    name: "Fast & Reliable",
    description: "Schedule meetings quickly with no fuss.",
    icon: Rocket,
  },
  {
    name: "Secure with Nylas",
    description: "Trusted encryption powered by Nylas.",
    icon: Lock,
  },
  {
    name: "Simple Interface",
    description: "Modern design that's easy to navigate.",
    icon: CloudRain,
  },
];

export default function FeaturesPage() {
  return (
    <main className="text-gray-800 container mx-auto px-4">
      {/* Section 1 - Intro */}
      <section className="flex flex-col items-center w-full mx-auto text-center bg-gradient-to-b from-white via-blue-100 to-pink-50 py-[10%] px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-pink-600">
          Beautiful scheduling, made simple.
        </h1>
        <p className="mt-4 text-lg text-blue-800 max-w-xl mx-auto">
          Calenara helps you book meetings faster, easier, and more delightfully — for individuals and teams.
        </p>
      </section>

      {/* Section 2 - Features Grid */}
      <section className="py-16 bg-white px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex items-start gap-4 p-6 bg-[#fdf4ff] border border-[#fbcfe8] rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <div className="p-3 rounded-xl bg-pink-100 text-pink-700">
                <feature.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-pink-600">
                  {feature.name}
                </h3>
                <p className="mt-1 text-sm text-blue-900">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 - Why Choose Us */}
      <section className="py-20  px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-pink-600">
            Why CaleNara?
          </h2>
          <p className="mt-4 text-blue-800 text-lg py-3">
            We focus on clean design, powerful features, and an experience you'll enjoy every time.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
            <div className="bg-white border border-pink-100 rounded-2xl p-4">
              <h4 className="font-medium text-pink-700 mb-1">Minimal Setup</h4>
              <p className="text-sm text-blue-900">Just sign up and start booking. No clutter.</p>
            </div>
            <div className="bg-white border border-blue-100 rounded-2xl p-4">
              <h4 className="font-medium text-blue-700 mb-1">Smart UX</h4>
              <p className="text-sm text-blue-900">Intuitive workflows for fast scheduling.</p>
            </div>
            <div className="bg-white border border-pink-100 rounded-2xl p-4">
              <h4 className="font-medium text-pink-700 mb-1">Real Support</h4>
              <p className="text-sm text-blue-900">Reach out anytime. We’re here to help.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
