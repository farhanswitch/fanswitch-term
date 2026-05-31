import type { Metadata } from "next";
import { Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Developer Portfolio — Interactive Terminal",
  description:
    "An interactive developer portfolio featuring a Tic Tac Toe gateway and a Claude Code-style terminal interface. Built with Next.js, TypeScript, and TailwindCSS.",
  keywords: ["developer", "portfolio", "backend", "engineer", "terminal", "interactive"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full antialiased", geistMono.variable, jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0b] text-zinc-300 font-mono">
        {children}
      </body>
    </html>
  );
}
