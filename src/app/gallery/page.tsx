import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "A visual collection of UI designs, app screens, and creative explorations by Hauwa Yusuf.",
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <GalleryGrid />
    </main>
  );
}
