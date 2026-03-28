"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CustomCursor } from "../ui/CustomCursor";
import { TransitionProvider } from "./TransitionLink";
import { ExitPostcard } from "./ExitPostcard";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isCaseStudy = pathname.startsWith("/work/");
  const isWork = pathname === "/work";
  const isExplorations = pathname === "/explorations";
  const isGallery = pathname === "/gallery";
  const isAbout = pathname === "/about";
  const isProcess = pathname === "/process";
  const hasSidebar = isCaseStudy || isWork || isExplorations || isGallery || isAbout || isProcess;

  return (
    <TransitionProvider>
      <CustomCursor />
      {!hasSidebar && <Navbar />}
      <div className="flex-1">{children}</div>
      {!hasSidebar && <Footer />}
      {/* <ChatBubble /> — hidden for now */}
      <ExitPostcard />
    </TransitionProvider>
  );
}
