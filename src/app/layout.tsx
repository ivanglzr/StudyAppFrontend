import "@/css/index.css";
import { poppins } from "@/css/fonts";

import type { Metadata } from "next";

import { AlertMessage } from "@/components/AlertMessage";
import { ThemeManager } from "@/components/ThemeManager";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <AlertMessage />
        <ThemeManager />
      </body>
    </html>
  );
}
