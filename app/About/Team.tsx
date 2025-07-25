const teamMembers = [
  {
    name: "Jan Marshal",
    role: "Founder & CEO",
    photo: "/images/jan-marshal.jpg",
    bio: "Passionate about building products that make life easier.",
  },
  {
    name: "Samantha Lee",
    role: "CTO",
    photo: "/images/samantha-lee.jpg",
    bio: "Technology enthusiast and problem solver.",
  },
  {
    name: "Alex Kim",
    role: "Head of Design",
    photo: "/images/alex-kim.jpg",
    bio: "Designs intuitive and user-friendly experiences.",
  },
];

export function Team() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20">
      {/* Section Header */}
      <h2 className="text-4xl font-bold text-center text-pink-600 mb-14">
        Meet Our Team
      </h2>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {teamMembers.map(({ name, role, photo, bio }) => (
          <article
            key={name}
            className="rounded-2xl bg-white/80 border border-pink-100 backdrop-blur-sm p-6 shadow-md transition hover:shadow-xl hover:scale-[1.02] duration-300 text-center"
          >
            <img
              src={photo}
              alt={name}
              className="w-28 h-28 rounded-full object-cover mx-auto mb-4 border-4 border-pink-200"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold text-pink-700">{name}</h3>
            <p className="text-sm text-pink-500 mb-2">{role}</p>
            <p className="text-sm text-muted-foreground px-2">{bio}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
