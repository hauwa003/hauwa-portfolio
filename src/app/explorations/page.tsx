import type { Metadata } from "next";
import { ExplorationsContent } from "@/components/explorations/ExplorationsContent";
import { WipeTransition } from "@/components/layout/WipeTransition";

export const metadata: Metadata = {
  title: "Explorations",
  description:
    "Side projects and experiments by Hauwa Yusuf — personal apps, Chrome extensions, and creative builds.",
};

export default function ExplorationsPage() {
  return (
    <WipeTransition>
      <main className="min-h-screen">
        <ExplorationsContent />
      </main>
    </WipeTransition>
  );
}
