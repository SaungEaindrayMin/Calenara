import {
  addMinutes,
  format,
  fromUnixTime,
  isAfter,
  isBefore,
  parse,
} from "date-fns";

import { Prisma } from "@prisma/client";

import Link from "next/link";

import { NylasResponse, GetFreeBusyResponse } from "nylas";
import prisma from "@/app/lib/db";
import { nylas } from "@/app/lib/nylas";
import { Button } from "../ui/button";

interface iappProps {
  selectedDate: Date;
  userName: string;
  meetingDuration: number;
}

async function getAvailability(selectedDate: Date, userName: string) {
  const currentDay = format(selectedDate, "EEEE");

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);
  const data = await prisma.availability.findFirst({
    where: {
      day: currentDay as Prisma.EnumDayFilter,
      User: {
        userName: userName,
      },
    },
    select: {
      fromTime: true,
      tillTime: true,
      id: true,
      User: {
        select: {
          grantEmail: true,
          grantId: true,
        },
      },
    },
  });

  const nylasCalendarData = await nylas.calendars.getFreeBusy({
    identifier: data?.User.grantId as string,
    requestBody: {
      startTime: Math.floor(startOfDay.getTime() / 1000),
      endTime: Math.floor(endOfDay.getTime() / 1000),
      emails: [data?.User.grantEmail as string],
    },
  });

  return { data, nylasCalendarData };
}

function calculateAvailableTimeSlots(
  dbAvailability: {
    fromTime: string | undefined;
    tillTime: string | undefined;
  },
  nylasData: NylasResponse<GetFreeBusyResponse[]>,
  date: string,
  duration: number
) {
  const now = new Date();

  const availableFrom = parse(
    `${date} ${dbAvailability.fromTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );
  const availableTill = parse(
    `${date} ${dbAvailability.tillTime}`,
    "yyyy-MM-dd HH:mm",
    new Date()
  );

  const busySlots = nylasData.data[0].timeSlots.map((slot: any) => ({
    start: fromUnixTime(slot.startTime),
    end: fromUnixTime(slot.endTime),
  }));

  const allSlots = [];
  let currentSlot = availableFrom;
  while (isBefore(currentSlot, availableTill)) {
    allSlots.push(currentSlot);
    currentSlot = addMinutes(currentSlot, duration);
  }

  const freeSlots = allSlots.filter((slot) => {
    const slotEnd = addMinutes(slot, duration);
    return (
      isAfter(slot, now) &&
      !busySlots.some(
        (busy: { start: any; end: any }) =>
          (!isBefore(slot, busy.start) && isBefore(slot, busy.end)) ||
          (isAfter(slotEnd, busy.start) && !isAfter(slotEnd, busy.end)) ||
          (isBefore(slot, busy.start) && isAfter(slotEnd, busy.end))
      )
    );
  });

  return freeSlots.map((slot) => format(slot, "HH:mm"));
}

export async function TimeTable({
  selectedDate,
  userName,
  meetingDuration,
}: iappProps) {
  const { data, nylasCalendarData } = await getAvailability(
    selectedDate,
    userName
  );

  const dbAvailability = { fromTime: data?.fromTime, tillTime: data?.tillTime };

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const availableSlots = calculateAvailableTimeSlots(
    dbAvailability,
    nylasCalendarData,
    formattedDate,
    meetingDuration
  );

  return (
    <div>
      <p className="text-base font-semibold">
        {format(selectedDate, "EEE")}.{" "}
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, "MMM. d")}
        </span>
      </p>

      <div className="mt-3 max-h-[350px] overflow-y-auto">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot, index) => (
            <Link
              key={index}
              href={`?date=${format(selectedDate, "yyyy-MM-dd")}&time=${slot}`}
            >
              <Button
                variant="outline"
                className="w-full mb-2 transition-colors duration-200 hover:bg-pink-100 hover:text-pink-700 focus:bg-pink-200 focus:text-pink-800"
              >
                {slot}
              </Button>
            </Link>
          ))
        ) : (
          <p>No available time slots for this date.</p>
        )}
      </div>
    </div>
  );
}
