import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SITE_NAME || "Shift",
  description: "Used bikes marketplace with AI listing generation"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{fontFamily: "Inter, system-ui, Arial, sans-serif"}}>{children}</body>
    </html>
  );
}
