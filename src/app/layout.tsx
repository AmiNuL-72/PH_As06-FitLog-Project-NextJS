import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { WorkoutProvider } from "@/context/WorkoutContext";

export const metadata: Metadata = {
  title: "FitLog - Train With Intent",
  description: "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0d0e12] text-gray-100 font-sans">
        <WorkoutProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}