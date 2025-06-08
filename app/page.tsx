// app/page.tsx
import HomeClient from "./components/HomeClient";
import { auth } from "./lib/auth";
import { redirect } from "next/navigation";


export default async function Home() {
  const session = await auth();
  if (session?.user) {
    return redirect("/Dashboard");
  }

  return <HomeClient />;
}
