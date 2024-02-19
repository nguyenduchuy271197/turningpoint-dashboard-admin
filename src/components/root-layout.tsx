import "@/app/globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import Providers from "./providers";

import Header from "./header";
import Sidebar from "./sidebar";
import { Toaster } from "./ui/sonner";

interface RootLayoutProps {
  children: ReactNode;
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
        suppressHydrationWarning={true}
      >
        <Providers>
          <div className="h-screen flex overflow-hidden">
            <Sidebar />
            <div className="grow flex flex-col">
              <Header className="shrink-0" />
              <main className="grow overflow-y-scroll pb-12">{children}</main>
            </div>
          </div>
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
