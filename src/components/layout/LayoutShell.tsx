"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ExitMessage } from "./ExitMessage";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWork = pathname === "/work";
  const isCaseStudy = pathname.startsWith("/work/");
  const isGallery = pathname === "/gallery";
  const isAbout = pathname === "/about";
  const isProcess = pathname === "/process";
  const hasSidebar = isWork || isCaseStudy || isGallery || isAbout || isProcess;

  return (
    <>
      {!hasSidebar && <ExitMessage />}
      {!hasSidebar && <Navbar />}
      <div className="flex-1">{children}</div>
      {!hasSidebar && <Footer />}
    </>
  );
}
