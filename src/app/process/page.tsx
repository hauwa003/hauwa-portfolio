import type { Metadata } from "next";
import { ProcessContent } from "@/components/process/ProcessContent";
import { ProcessSidebar } from "@/components/process/ProcessSidebar";
import { ProcessMobileHeader } from "@/components/process/ProcessMobileHeader";
import { ContentEntrance } from "@/components/layout/ContentEntrance";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Hauwa Yusuf approaches product design, from discovery and research to design delivery.",
};

export default function ProcessPage() {
  return (
    <main>
      <ProcessSidebar />
      <ProcessMobileHeader />
      <ContentEntrance>
        <div className="lg:ml-[360px]">
          <ProcessContent />
        </div>
      </ContentEntrance>
    </main>
  );
}
