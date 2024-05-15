import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/_providers/providers";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "askme",
  description: "Just app askme",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} px-4 max-h-[100vh] overflow-hidden`}>
        <Providers>
          <main className={"grid h-[80vh] pt-4"}>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
