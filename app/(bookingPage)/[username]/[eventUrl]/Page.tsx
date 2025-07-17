import { Calendar } from "@/app/components/BookingForm/Calendar";
import { RenderCalendar } from "@/app/components/BookingForm/RenderCalendar";
import { TimeTable } from "@/app/components/BookingForm/TimeTable";
import { Card, CardContent } from "@/app/components/ui/card";
import prisma from "@/app/lib/db";
import { CalendarX2, Clock, VideoIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(eventUrl: string, userName: string) {
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
  searchParams: { date?: string };
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

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-[#FADADD] to-[#D6EAF8] p-6">
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
    </div>
  );
}
