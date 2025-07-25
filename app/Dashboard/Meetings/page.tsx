import { cancelMeetingAction } from "@/app/action";
import { EmptyState } from "@/app/components/dashboard/EmptyState";
import { SubmitButton } from "@/app/components/SubmitBtn";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Separator } from "@/app/components/ui/separator";
import { auth } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { format, fromUnixTime } from "date-fns";
import { Icon, Video } from "lucide-react";

import React from "react";

async function getData(userId: string) {
  const userData = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      grantId: true,
      grantEmail: true,
    },
  });

  if (!userData) {
    throw new Error("User not found");
  }
  const data = await nylas.events.list({
    identifier: userData?.grantId as string,
    queryParams: {
      calendarId: userData?.grantEmail as string,
    },
  });

  return data;
}

const MeetingsPage = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);

  return (
    <>
      {data.data.length < 1 ? (
        <EmptyState
          title="No meetings found"
          description="You don't have any meetings yet."
          buttonText="Create a new event type"
          href="/Dashboard/New"
        />
      ) : (
        <Card className="bg-white border-dashed border-pink-400 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-pink-600 text-4xl">Bookings</CardTitle>
            <CardDescription className="text-slate-400">
              See upcoming and past events booked through your event type links.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {data.data.map((item) => (
              <form
                key={item.id}
                action={cancelMeetingAction}
                className="bg-white p-4 rounded-xl border border-pink-200 "
              >
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid md:grid-cols-3 gap-4 items-center">
                  {/* Left: Time & Link */}
                  <div>
                    <p className="text-sm text-[#7D7D7D]">
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p className="text-xs text-[#9CA3AF] pt-1">
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center mt-1">
                      <Video className="size-4 mr-2 text-pink-400" />
                      <a
                        className="text-xs text-pink-500 underline underline-offset-4"
                        target="_blank"
                        href={item.conferencing.details.url}
                      >
                        Join Meeting
                      </a>
                    </div>
                  </div>

                  {/* Center: Info */}
                  <div className="flex flex-col items-start">
                    <h2 className="text-sm font-medium text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-[#7D7D7D]">
                      You and {item.participants[0].name}
                    </p>
                  </div>

                  {/* Right: Cancel */}
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="w-fit ml-auto text-white bg-pink-400 hover:bg-pink-500"
                  />
                </div>
              </form>
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MeetingsPage;

{
  /* <form key={item.id} action={cancelMeetingAction}>
                <input type="hidden" name="eventId" value={item.id} />
                <div className="grid grid-cols-3 justify-between items-center">
                  <div>
                    <p>
                      {format(fromUnixTime(item.when.startTime), "EEE, dd MMM")}
                    </p>
                    <p>
                      {format(fromUnixTime(item.when.startTime), "hh:mm a")} -{" "}
                      {format(fromUnixTime(item.when.endTime), "hh:mm a")}
                    </p>
                    <div className="flex items-center">
                      <Video className="size-4 mr-2 text-primary" />{" "}
                      <a target="_blank" href={item.conferencing.details.url}>
                        Join Meeting
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <h2>{item.title}</h2>
                    <p>You and {item.participants[0].name}</p>
                  </div>
                  <SubmitButton
                    text="Cancel Event"
                    variant="destructive"
                    className="w-fit flex ml-auto"
                  />
                </div>
                <Separator className="my-3" />
              </form> */
}
