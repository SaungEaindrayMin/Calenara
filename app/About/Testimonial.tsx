import { SVGProps } from "react";

type TestimonialProps = {
  name: string;
  role: string;
  message: string;
  icon?: React.ReactNode;
};

export function TestimonialList() {
  const testimonials: TestimonialProps[] = [
    {
      name: "Jan",
      role: "Programmer | YouTuber",
      message:
        "Wow Calenara is the best platform I have ever used. Definitely recommend it to you guys, try it out!",
    },
    {
      name: "Samantha Lee",
      role: "Product Manager",
      message:
        "Using Calenara helped our team improve collaboration and deliver projects faster. Highly recommended!",
    },
    {
      name: "Alex Kim",
      role: "Freelance Developer",
      message:
        "The platform’s UI is clean and intuitive. It really speeds up my workflow.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 py-[10%]">
      <TestimonialHeader />
      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map(({ name, role, message, icon }, idx) => (
          <TestimonialCard
            key={idx}
            name={name}
            role={role}
            message={message}
            icon={icon}
          />
        ))}
      </div>
    </section>
  );
}

function TestimonialHeader() {
  return (
    <header className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-extrabold text-pink-600 mb-4">
        What Our Users Say
      </h2>
      <p className="text-lg text-pink-400">
        Hear directly from our amazing community and how CalMarshal has
        transformed their workflow.
      </p>
    </header>
  );
}

function TestimonialCard({ name, role, message, icon }: TestimonialProps) {
  return (
    <article className="relative p-8 bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-xl shadow-lg border border-pink-200 flex flex-col items-center text-center">
      {/* Icon */}
      <div className="mb-6 text-pink-400">{icon}</div>

      {/* Quotation Mark */}
      <svg
        className="absolute top-6 left-6 w-10 h-10 text-pink-200"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7.17 6.5a5 5 0 0 0-5 5v3h5v-3H7a2 2 0 1 1 0-4h.17zm10 0a5 5 0 0 0-5 5v3h5v-3h-.17a2 2 0 1 1 0-4h.17z" />
      </svg>

      {/* Message */}
      <p className="relative text-lg font-semibold text-pink-900 leading-relaxed mb-6 px-4">
        {message}
      </p>

      {/* Footer */}
      <footer>
        <p className="text-base font-semibold text-pink-800">{name}</p>
        <p className="text-sm text-pink-600">{role}</p>
      </footer>
    </article>
  );
}

const YouTube = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#F472B6" // pastel pink stroke
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="7" width="20" height="10" rx="4" ry="4" fill="#FBCFE8" />
    <polygon points="10 8 16 12 10 16" fill="#FFFFFF" />
  </svg>
);
