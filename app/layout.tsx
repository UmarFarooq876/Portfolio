import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "John Doe - Full Stack Developer Portfolio",
  description: "Professional portfolio of John Doe, a full-stack developer and UI/UX designer specializing in React, Next.js, and modern web technologies.",
  keywords: ["portfolio", "developer", "full-stack", "React", "Next.js", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "John Doe" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
