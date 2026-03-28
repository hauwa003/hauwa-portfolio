import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, DM_Sans, Kalam } from "next/font/google";
import { LayoutShell } from "@/components/layout/LayoutShell";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hauwa Yusuf | Product Designer & Framer Developer",
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
      className={`${bricolageGrotesque.variable} ${dmSans.variable} ${caveat.variable} ${kalam.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-foreground">
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
