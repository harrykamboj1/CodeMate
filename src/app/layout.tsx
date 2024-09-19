import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthSessionProvider } from "./provider";
import { Header } from "./header";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import PingServer from "@/components/ping-server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CodeMate",
  description:
    "An application to help pair programming with random devs online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthSessionProvider>
          <NextTopLoader />
          <Header />
          {children}
          <Toaster />
          <PingServer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
