import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
