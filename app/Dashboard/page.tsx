import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import prisma from "../lib/db";

import { ExternalLink, Pen, Settings, Trash, Users2 } from "lucide-react";

import { EmptyState } from "../components/dashboard/EmptyState";
import requireUser from "../lib/requireUser";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      EventType: {
        select: { id: true, active: true, title: true, url: true, duration: true },
        orderBy: { createdAt: "desc" },
      },
      userName: true,
    },
  });

  if (!data) return notFound();
  return data;
}

const DashbaordPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <div className="bg-gradient-to-br from-pink-50 via-white to-blue-50  border border-dashed border-pink-200  rounded-2xl p-4">
      <div className="flex items-center justify-between mb-8 px-2">
        <div className="hidden sm:grid gap-1">
          <h1 className="font-heading text-3xl md:text-4xl text-gray-800">Event Types</h1>
          <p className="text-lg text-gray-600">Create and manage your event types.</p>
        </div>
        <Button asChild className="bg-pink-500 hover:bg-pink-400 text-white mt-3">
          <Link href="/Dashboard/New">Create New Event</Link>
        </Button>
      </div>

      {data.EventType.length === 0 ? (
        <EmptyState
          title="You have no Event Types"
          description="You can create your first event type by clicking the button below."
          buttonText="Add Event Type"
          href="/Dashboard/New"
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.EventType.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur border border-gray-200 shadow-lg rounded-2xl overflow-hidden relative hover:shadow-xl transition"
            >
              {/* Dropdown Settings */}
              <div className="absolute top-3 right-3 z-10">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Settings className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-28" align="end">
                    <DropdownMenuLabel>Event</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href={`/${data.userName}/${item.url}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          <span>Preview</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem asChild>
                        <Link href={`/Dashboard/event/${item.id}`}>
                          <Pen className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/Dashboard/event/${item.id}/delete`}>
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Main Card Content */}
              <Link href={`/dashboard/event/${item.id}`}>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <Users2 className="h-6 w-6 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 truncate">
                        {item.duration} Minutes Meeting
                      </p>
                      <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="px-6 py-4 bg-pink-50 border-t border-gray-100 flex justify-between items-center">
                <Link href={`/dashboard/event/${item.id}`}>
                  <Button className="bg-blue-200 hover:bg-blue-300 text-black">
                    Edit Event
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashbaordPage;
