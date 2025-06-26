"use client";

import { CalendarIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// TypeScript interface
interface iAppProps {
  id: number;
  name: string;
  href: string;
  icon: ReactNode;
}

export const dashboardLinks: iAppProps[] = [
  {
    id: 0,
    name: "Event Types",
    href: "/Dashboard",
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    id: 1,
    name: "Meetings",
    href: "/Dashboard/meetings",
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Available Times",
    href: "/Dashboard/AvailableTimes",
    icon: <CalendarIcon className="w-5 h-5" />,
  },
  {
    id: 3,
    name: "Calenara Settings",
    href: "/Dashboard/settings",
    icon: <Cog6ToothIcon className="w-5 h-5" />,
  },
];

export default function DashboardLinks() {
  const pathName = usePathname();

  return (
    <nav className="space-y-3">
      {dashboardLinks.map((link) => {
        const isActive = pathName === link.href;
        return (
          <Link
            key={link.id}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-5 rounded-lg transition-colors duration-200 group
              ${
                isActive
                  ? "bg-pink-100 text-pink-600 font-medium shadow-sm"
                  : "hover:bg-gray-50 text-gray-600"
              }`}
          >
            <span
              className={`w-5 h-5 transition-transform duration-150 ${
                isActive ? "text-pink-600" : "group-hover:text-pink-500"
              }`}
            >
              {link.icon}
            </span>
            <span className="text-sm tracking-wide">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
