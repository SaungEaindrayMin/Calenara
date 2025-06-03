import { ReactNode } from "react";
import { FaCalendar } from "react-icons/fa6";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:block border-r bg-slate-300">
            <div className="flex flex-col gap-2 h-full max-h-screen ">
                <div className="flex h-14 items-center border-b -px-4 lg:h-[60px] lg:px-6">
                    <FaCalendar />
                </div>
            </div>
        </div>
    </div>
  );
}
