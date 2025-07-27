"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Jan Marshal",
    role: "Founder & CEO",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=256&q=80",
    bio: "Passionate about building products that make life easier.",
  },
  {
    name: "Samantha Lee",
    role: "CTO",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    bio: "Technology enthusiast and problem solver.",
  },
  {
    name: "Alex Kim",
    role: "Head of Design",
    photo: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80",
    bio: "Designs intuitive and user-friendly experiences.",
  },
  {
    name: "Emma Torres",
    role: "Marketing Lead",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80",
    bio: "Creative storyteller and digital strategist.",
  },
  {
    name: "Liam Chen",
    role: "Lead Developer",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=256&q=80",
    bio: "Loves building scalable web experiences.",
  },
  {
    name: "Ava Patel",
    role: "Product Manager",
    photo: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=256&q=80",
    bio: "Bridging tech and business with clarity.",
  },
];

export function Team() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-28">
      {/* Section Header */}
      <div className="mb-20 text-center">
        <h2 className="text-5xl font-extrabold tracking-tight text-pink-600">
          Meet Our Team
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          We’re a team of passionate makers, thinkers, and builders crafting meaningful digital experiences.
        </p>
      </div>

      {/* Team Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {teamMembers.map(({ name, role, photo, bio }, index) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative bg-white/60 backdrop-blur-md rounded-3xl border border-pink-100 shadow-lg hover:shadow-xl transition-all duration-300 p-8"
          >
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={photo}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md mb-4"
                  loading="lazy"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-300 to-pink-200 opacity-10 group-hover:opacity-20 transition duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-pink-700">{name}</h3>
              <p className="text-sm text-pink-500">{role}</p>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed">{bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
