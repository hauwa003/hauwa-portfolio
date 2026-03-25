import type { Metadata } from "next";

const BASE_URL = "https://hauwa.design";

export function createMetadata({
  title,
  description,
  path = "",
  image = "/images/og/og-default.png",
}: {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${path}`,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
