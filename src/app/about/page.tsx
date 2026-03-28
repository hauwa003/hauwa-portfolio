import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";
import { AboutSidebar } from "@/components/about/AboutSidebar";
import { AboutMobileHeader } from "@/components/about/AboutMobileHeader";
import { ContentEntrance } from "@/components/layout/ContentEntrance";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hauwa Yusuf, a product designer and Framer developer with 4+ years of experience helping startups build better products.",
};

export default function AboutPage() {
  return (
    <main>
      <AboutSidebar />
      <AboutMobileHeader />
      <ContentEntrance>
        <div className="lg:ml-[360px]">
          <AboutContent />
        </div>
      </ContentEntrance>
    </main>
  );
}
