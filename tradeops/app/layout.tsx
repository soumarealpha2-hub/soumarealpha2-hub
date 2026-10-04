import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TradeOps | Operations Command Center",
  description: "An interactive trading operations portfolio by Alpha Soumaré. Explore sample settlements, exception control, and workload stress scenarios.",
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
