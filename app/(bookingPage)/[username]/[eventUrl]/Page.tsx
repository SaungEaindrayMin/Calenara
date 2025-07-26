import { createMeetingAction } from "@/app/action";
import { Calendar } from "@/app/components/BookingForm/Calendar";
import { RenderCalendar } from "@/app/components/BookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/BookingForm/TimeTable";
import { SubmitButton } from "@/app/components/SubmitBtn";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Separator } from "@/app/components/ui/separator";
import prisma from "@/app/lib/db";
import { BookMarked, CalendarX2, Clock, VideoIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData( userName: string,eventUrl: string,) {
  const data = await prisma.eventType.findFirst({
    where: {
      url: eventUrl,
      user: {
        userName: userName,
      },
      active: true,
    },
    select: {
      id: true,
      description: true,
      title: true,
      duration: true,
      videoCallSoftware: true,
      user: {
        select: {
          name: true,
          image: true,
          Availability: {
            select: {
              day: true,
              isActive: true,
            },
          },
        },
      },
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function BookingFormRoute({
  params,
  searchParams,
}: {
  params: { userName: string; eventUrl: string };
  searchParams: { date?: string; time?: string };
}) {
  const data = await getData(params.eventUrl, params.userName);
  const selectedDate = searchParams.date
    ? new Date(searchParams.date)
    : new Date();

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(selectedDate);

  const showForm = !!searchParams.date && !!searchParams.time;

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#FADADD] to-[#D6EAF8] p-6">
{showForm ? (
  <Card className="max-w-7xl mx-auto  bg-white border-dashed border-pink-400 rounded-2xl ">
    <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left Side: Info */}
      <div className="bg-[#F5F9FF] p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-4">
          <img
            src={data.user.image as string}
            alt="Profile"
            className="w-14 h-14 rounded-full border-2 border-[#D6EAF8] shadow"
          />
          <div>
            <p className="text-sm font-medium text-pink-500">{data.user.name}</p>
            <h1 className="text-xl font-semibold text-[#2D2D2D] mt-1">{data.title}</h1>
          </div>
        </div>

        <p className="text-sm text-[#7D7D7D] mt-4">{data.description}</p>

        <div className="mt-6 space-y-4">
          <p className="flex items-center text-sm text-[#6B7280]">
            <CalendarX2 className="size-4 mr-2 text-pink-500" />
            {formattedDate}
          </p>
          <p className="flex items-center text-sm text-[#6B7280]">
            <Clock className="size-4 mr-2 text-pink-500" />
            {data.duration} Mins
          </p>
          <p className="flex items-center text-sm text-[#6B7280]">
            <BookMarked className="size-4 mr-2 text-pink-500" />
            {data.videoCallSoftware}
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <form
        className="bg-white p-6 rounded-xl shadow-sm flex flex-col gap-4 border border-pink-300"
        action={createMeetingAction}
      >
        <input type="hidden" name="eventTypeId" value={data.id} />
        <input type="hidden" name="username" value={params.userName} />
        <input type="hidden" name="fromTime" value={searchParams.time} />
        <input type="hidden" name="eventDate" value={searchParams.date} />
        <input type="hidden" name="meetingLength" value={data.duration} />

        <div className="flex flex-col gap-1">
          <Label className="text-[#333]">Your Name</Label>
          <Input
            name="name"
            placeholder="Your Name"
            className="bg-[#FDF6F0] border border-pink-200 focus:ring-pink-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-[#333]">Your Email</Label>
          <Input
            name="email"
            placeholder="johndoe@gmail.com"
            className="bg-[#FDF6F0] border border-pink-200 focus:ring-pink-300"
          />
        </div>

        <SubmitButton text="Book Meeting" className="bg-pink-400 hover:bg-pink-500 text-white" />
      </form>
    </CardContent>
  </Card>

      ) : (
        <Card className="w-full max-w-7xl bg-white border border-[#FADADD] shadow-xl rounded-3xl">
          <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 items-start">
            <div className="flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-4">
                  <img
                    src={data.user.image as string}
                    alt="Profile"
                    className="w-14 h-14 rounded-full border-2 border-[#D6EAF8] shadow-sm"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Hosted by</p>
                    <h2 className="text-lg font-semibold text-[#D6336C]">
                      {data.user.name}
                    </h2>
                  </div>
                </div>
                <div className="mt-6">
                  <h1 className="text-2xl font-bold ">{data.title}</h1>
                  <p className="mt-2 text-gray-700">{data.description}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-gray-500">
                  <CalendarX2 className="mr-2 text-[#D6336C]" />
                  <span className="text-sm">{formattedDate}</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Clock className="mr-2 text-[#D6336C]" />
                  <span className="text-sm">{data.duration} Minutes</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <VideoIcon className="mr-2 text-[#D6336C]" />
                  <span className="text-sm">{data.videoCallSoftware}</span>
                </div>
              </div>
            </div>
            <div>
              <RenderCalendar daysofWeek={data.user.Availability} />
            </div>

            <div>
              <TimeTable
                selectedDate={selectedDate}
                userName={params.userName}
                meetingDuration={data.duration}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
