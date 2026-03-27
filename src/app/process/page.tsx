import type { Metadata } from "next";
import { ProcessContent } from "@/components/process/ProcessContent";
import { ProcessSidebar } from "@/components/process/ProcessSidebar";
import { ProcessMobileHeader } from "@/components/process/ProcessMobileHeader";
import { WipeTransition } from "@/components/layout/WipeTransition";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Hauwa Yusuf approaches product design, from discovery and research to design delivery.",
};

export default function ProcessPage() {
  return (
    <WipeTransition>
      <main>
        <ProcessSidebar />
        <ProcessMobileHeader />
        <div className="lg:ml-[360px]">
          <ProcessContent />
        </div>
      </main>
    </WipeTransition>
  );
}
