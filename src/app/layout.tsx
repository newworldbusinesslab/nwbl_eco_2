import type { Metadata } from "next";
import "./globals.css";
import { GuideLauncher } from "@/components/guide/GuideLauncher";
import { tourStops } from "@/lib/guide-directory";

export const metadata: Metadata = {
  title: "New World Business Lab",
  description:
    "An AI-powered business ecosystem for founders, creators, vendors, artists, small businesses, and future builders.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}<GuideLauncher stops={tourStops} /></body>
    </html>
  );
}
