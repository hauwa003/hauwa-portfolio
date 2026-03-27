import type { Metadata } from "next";
import { WorkSidebar } from "@/components/work/WorkSidebar";
import { WorkMobileHeader } from "@/components/work/WorkMobileHeader";
import { WorkContent } from "@/components/work/WorkContent";
import { WipeTransition } from "@/components/layout/WipeTransition";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects by Hauwa Yusuf, product design, dashboards, mobile apps, and web experiences.",
};

export default function WorkPage() {
  return (
    <WipeTransition>
      <main>
        <WorkSidebar />
        <WorkMobileHeader />
        <div className="lg:ml-[360px]">
          <WorkContent />
        </div>
      </main>
    </WipeTransition>
  );
}
