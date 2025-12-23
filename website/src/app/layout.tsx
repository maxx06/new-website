import type { Metadata } from "next";
import { Inter, Space_Grotesk, Poppins, Syne, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/contexts/sidebar-context";
import { ChatOverlay } from "@/components/chat-overlay";
import { SmoothCursor } from "@/components/magicui/smooth-cursor";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
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
        className={`${inter.variable} ${spaceGrotesk.variable} ${poppins.variable} ${syne.variable} ${sourceCodePro.variable} antialiased overflow-x-hidden bg-background text-foreground cursor-none`}
        style={{ fontFamily: 'var(--font-inter)' }}
      >
        <SidebarProvider>
          <SmoothCursor />
          <Navbar />
          {children}
          <ChatOverlay />
        </SidebarProvider>
      </body>
    </html>
  );
}
