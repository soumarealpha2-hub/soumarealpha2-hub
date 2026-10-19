import type { Metadata } from "next";
import "./globals.css";
import "./fintech.css";
import "./academy.css";
import "./first-seat.css";

export const metadata: Metadata = {
  title: "First Seat Academy | Find Your Place in Finance.",
  description: "Find your place in finance. Explore careers, build your skills, and practice realistic finance scenarios with First Seat Academy, created by Alpha Soumaré.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
