"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ExitMessage } from "./ExitMessage";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/work/");

  return (
    <>
      {!isCaseStudy && <ExitMessage />}
      {!isCaseStudy && <Navbar />}
      <div className="flex-1">{children}</div>
      {!isCaseStudy && <Footer />}
    </>
  );
}
