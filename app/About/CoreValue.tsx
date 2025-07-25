const values = [
  {
    title: "Integrity",
    description:
      "We operate with honesty and transparency in everything we do.",
    icon: (
      <svg
        className="w-8 h-8 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 20v-6M6 12v-4a6 6 0 0112 0v4" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    description:
      "We constantly seek creative solutions and embrace new ideas.",
    icon: (
      <svg
        className="w-8 h-8 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M14.31 8l5.74 9.94M9.69 8h11.48" />
      </svg>
    ),
  },
  {
    title: "Customer-first",
    description:
      "Our users’ success is our success. We listen and adapt quickly.",
    icon: (
      <svg
        className="w-8 h-8 text-pink-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 14l9-5-9-5-9 5 9 5z" />
        <path d="M12 14v7" />
        <path d="M12 14L3 9" />
      </svg>
    ),
  },
];

export function CoreValues() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-4xl font-bold text-pink-600 mb-10 text-center">
        Our Core Values
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map(({ title, description, icon }) => (
          <article
            key={title}
            className="bg-pink-50 rounded-lg p-6 shadow-md flex flex-col items-center text-center"
          >
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-pink-800 mb-2">{title}</h3>
            <p className="text-pink-600">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
