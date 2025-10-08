import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { ChatOverlay } from "@/components/chat-overlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
        className={`${inter.variable} ${spaceGrotesk.variable} antialiased overflow-x-hidden bg-background text-foreground`}
        style={{ fontFamily: 'var(--font-inter)' }}
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
