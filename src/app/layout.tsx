import type { Metadata } from "next";
import { Instrument_Serif, Caveat } from "next/font/google";
import localFont from "next/font/local";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const tomatoGrotesk = localFont({
  src: [
    { path: "../../public/fonts/TomatoGrotesk-Light.otf", weight: "300" },
    { path: "../../public/fonts/TomatoGrotesk-Regular.otf", weight: "400" },
    { path: "../../public/fonts/TomatoGrotesk-Medium.otf", weight: "500" },
    { path: "../../public/fonts/TomatoGrotesk-SemiBold.otf", weight: "600" },
    { path: "../../public/fonts/TomatoGrotesk-Bold.otf", weight: "700" },
  ],
  variable: "--font-tomato-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hauwa Yusuf — Product Designer & Framer Developer",
    template: "%s | Hauwa Yusuf",
  },
  description:
    "Product designer and Framer developer helping startups turn complex ideas into intuitive digital experiences.",
  openGraph: {
    type: "website",
    url: "https://hauwa.design",
    siteName: "Hauwa Yusuf",
    images: [{ url: "/images/og/og-default.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  metadataBase: new URL("https://hauwa.design"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${tomatoGrotesk.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
