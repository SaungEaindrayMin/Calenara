import { updateAvailabilityAction } from "@/app/action";
import { SubmitButton } from "@/app/components/SubmitBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Switch } from "@/app/components/ui/switch";
import prisma from "@/app/lib/db";
import requireUser from "@/app/lib/requireUser";
import { times } from "@/app/lib/times";
import { notFound } from "next/navigation";
import React from "react";

async function getData(userId: string) {
  const data = await prisma.availability.findMany({
    where: { userId },
  });

  if (!data || data.length === 0) return notFound();

  return data;
}

const AvailabilityPage = async () => {
  const session = await requireUser();
  const data = await getData(session.user?.id as string);

  return (
    <Card className="bg-gradient-to-br from-pink-50 via-white to-blue-50 border border-dashed border-pink-200 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-pink-600 text-2xl font-semibold">
          Availability
        </CardTitle>
        <CardDescription className="text-blue-500">
          In this section you can manage your availability.
        </CardDescription>
      </CardHeader>

      <form action={updateAvailabilityAction}>
        <CardContent className="flex flex-col gap-y-6">
          {data.map((item) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-6 bg-white rounded-xl px-4 py-1 "
              key={item.id}
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id} />

              <div className="flex items-center gap-x-3 text-pink-600 font-medium">
                <Switch
                  name={`isActive-${item.id}`}
                  defaultChecked={item.isActive}
                  className="data-[state=checked]:bg-pink-400"
                />
                <p>{item.day}</p>
              </div>

              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full bg-pink-100 text-pink-700 focus:ring-2 focus:ring-pink-300">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent className="bg-pink-50">
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full bg-blue-100 text-blue-700 focus:ring-2 focus:ring-blue-300">
                  <SelectValue placeholder="To Time" />
                </SelectTrigger>
                <SelectContent className="bg-blue-50">
                  <SelectGroup>
                    {times.map((time) => (
                      <SelectItem key={time.id} value={time.time}>
                        {time.time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <SubmitButton text="Save Changes" className="bg-pink-500 hover:bg-pink-400 text-white mt-3" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default AvailabilityPage;
