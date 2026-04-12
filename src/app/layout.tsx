import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DealPulse — Your market. Your brand. Daily deals — automated.",
  description:
    "White-labeled Deal of the Day real estate apps for agents and brokerages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white text-brand-dark antialiased">{children}</body>
    </html>
  );
}
