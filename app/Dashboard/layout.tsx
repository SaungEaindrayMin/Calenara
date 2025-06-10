// app/Dashboard/layout.tsx
import DashboardLayout from "../components/DashboardLayout";
import { auth } from "../lib/auth";

import { ReactNode } from "react";
import requireUser from "../lib/requireUser";

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth();

  return <DashboardLayout session={session}>{children}</DashboardLayout>;
}
