import type { Metadata } from "next";
import "./globals.css";

import { CreditIQProvider } from "@/context/CreditIQContext";

export const metadata: Metadata = {
  title: "CreditIQ AI",
  description: "AI-Powered Credit Risk Intelligence Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CreditIQProvider>
          {children}
        </CreditIQProvider>
      </body>
    </html>
  );
}