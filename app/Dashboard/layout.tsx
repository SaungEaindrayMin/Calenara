"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import DashboardLink from "../components/DashboardLink";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "../components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { auth } from "../lib/auth";
import { Button } from "../components/ui/button";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const session = await auth();

  return (
    <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden md:block border-r border-pink-300 bg-pink-100">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar (overlay) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-pink-100 border-r border-pink-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 h-14 border-b border-pink-300">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Image src="/schedule.png" alt="logo" width={40} height={40} />
            <p className="text-2xl">
              Cale<span className="text-pink-600">Nara</span>
            </p>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-pink-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="grid items-start gap-2 p-4">
          <DashboardLink />
        </nav>
      </aside>

      {/* Main content layout */}
      <div className="flex flex-col">
        <header className="w-full h-14 flex items-center justify-between border-b border-pink-300 px-5 lg:h-[60px] lg:px-6 bg-pink-100">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-pink-600"
          >
            <Menu className="w-6 h-6" />
          </button>
          {/* 
          <div className="flex-1">
            <ThemeToggle />
          </div> */}

          <div className="ml-auto flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                size="icon"
                  className="
                rounded-full "
                >
                  <img
                    src={session?.user?.image as string}
                    alt="Pofile Image"
                    width={20}
                    height={20}
                    className="object-cover w-full h-full rounded-full "
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex flex-col gap-2 h-full max-h-screen">
      <div className="flex h-14 items-center border-b border-pink-300 px-5 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <Image src="/schedule.png" alt="logo" width={60} height={60} />
          <p className="text-4xl">
            Cale<span className="text-pink-600">Nara</span>
          </p>
        </Link>
      </div>
      <nav className="flex-1 grid items-start gap-2 p-4">
        <DashboardLink />
      </nav>
    </div>
  );
}
