import { Button } from "../components/ui/button";

export function CTA({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <section className="  mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-24 py-20">
      <div className=" z-10 overflow-hidden rounded-3xl border border-pink-200 bg-white/50 backdrop-blur-xl px-6 py-20 text-center shadow-md shadow-blue-200 sm:px-16">
        {/* Headline */}
        <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-pink-600 sm:text-5xl">
          Start using Calenara now!
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pink-500">
          CalMarshal makes scheduling with clients effortless and delightful. Join thousands who trust us!
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onOpenModal}
            className="px-5 py-2 text-sm font-semibold text-white bg-pink-600 rounded-full hover:bg-pink-500 transition-all duration-300 shadow-md"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Glowing Background SVG */}
      <svg
        viewBox="0 0 1024 1024"
        className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 opacity-30"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#glow-gradient)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="glow-gradient">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="50%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#ffffff" />
          </radialGradient>
        </defs>
      </svg>
    </section>
  );
}
