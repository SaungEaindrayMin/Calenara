export const values = [
  {
    title: "Integrity",
    description: "We operate with honesty and transparency in everything we do.",
    icon: (
      <svg
        className="w-5 h-5 text-white"
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
    description: "We constantly seek creative solutions and embrace new ideas.",
    icon: (
      <svg
        className="w-5 h-5 text-white"
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
    description: "Our users’ success is our success. We listen and adapt quickly.",
    icon: (
      <svg
        className="w-5 h-5 text-white"
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
    <section className=" py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-pink-600">
          Unveiling Our Core Values
        </h2>
        <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto ">
          We're committed to values that shape our decisions, drive innovation, and deliver excellence in everything we do.
        </p>

        {/* Green horizontal card with icons */}
        <div className="mt-16 bg-gradient-to-br from-pink-100 via-white to-blue-100 rounded-2xl p-10 border border-pink-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-10 text-pink-500">
            {values.map(({ title, icon }) => (
              <div
                key={title}
                className="flex flex-col items-center justify-center text-center"
              >
                <div className="w-14 h-14 mb-4 rounded-full bg-blue-200 bg-opacity-20 flex items-center justify-center">
                  {icon}
                </div>
                <h4 className="text-lg font-semibold">{title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Full descriptions below */}
        <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
          {values.map(({ title, description }) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl shadow-sm border border-pink-200"
            >
              <h5 className="text-md font-bold text-pink-500">{title}</h5>
              <p className="mt-2 text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
