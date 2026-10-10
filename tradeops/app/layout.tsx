import type { Metadata } from "next";
import "./globals.css";
import "./fintech.css";

export const metadata: Metadata = {
  title: "TradeOps | The Operations Playground",
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
