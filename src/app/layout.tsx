import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
