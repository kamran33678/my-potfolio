import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Kamran | Modern Web Developer",
  description:
    "Muhammad Kamran is a Modern Web Developer specializing in clean, responsive, and high-performance web applications.",
  keywords: [
    "Muhammad Kamran",
    "Modern Web Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Tailwind CSS",
    "Pakistan",
  ],
  authors: [{ name: "Muhammad Kamran" }],
  creator: "Muhammad Kamran",
  openGraph: {
    title: "Muhammad Kamran | Modern Web Developer",
    description:
      "Muhammad Kamran is a Modern Web Developer specializing in clean, responsive, and high-performance web applications.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#09090b] text-white antialiased selection:bg-amber-400/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
