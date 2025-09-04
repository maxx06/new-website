import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { ChatOverlay } from "@/components/chat-overlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Max Xiong - Full Stack Developer",
  description: "Portfolio of Max Xiong, a passionate full-stack developer creating beautiful, functional web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-background text-foreground`}
      >
        <SidebarProvider>
          <div className="relative min-h-screen">
            {children}
            <ChatOverlay />
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
