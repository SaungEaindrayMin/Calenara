import DashboardLayout from "../components/DashboardLayout";
import { auth } from "../lib/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import prisma from "../lib/db";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    return redirect("/");
  }

  const data = await getData(session.user.id as string);

  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}

async function getData(id: string) {
  const data = await prisma.user.findUnique({
    where: { id },
    select: {
      userName: true,
      grantId: true,
    },
  });

  if (!data?.userName) {
    return redirect("/onboarding");
  }

  if (!data.grantId) {
    return redirect("/onboarding/grant-id");
  }

  return data;
}
