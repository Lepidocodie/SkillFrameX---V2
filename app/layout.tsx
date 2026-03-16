import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import { OnboardingBanner } from "./components/ui/OnboardingBanner";

const syne = Syne({
  variable: "--font-syne",
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
    template: "%s | SkillFrameX",
    default: "SkillFrameX - Master New Skills"
  },
  description: "Accelerate your career with premium courses designed for relentless learners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${syne.variable} ${inter.variable} font-sans antialiased selection:bg-primary/30 selection:text-white`}
      >
        <div className="fixed inset-0 -z-10  opacity-20 mix-blend-overlay pointer-events-none"></div>
        <Navbar />
        {children}
        <OnboardingBanner />
        <Footer />
      </body>
    </html>
  );
}
