import type { Metadata } from "next";
import { ExplorationsContent } from "@/components/explorations/ExplorationsContent";
import { ContentEntrance } from "@/components/layout/ContentEntrance";

export const metadata: Metadata = {
  title: "Explorations",
  description:
    "Side projects and experiments by Hauwa Yusuf, personal apps, Chrome extensions, and creative builds.",
};

export default function ExplorationsPage() {
  return (
    <main className="min-h-screen">
      <ContentEntrance>
        <ExplorationsContent />
      </ContentEntrance>
    </main>
  );
}
