import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // ชื่อที่จะปรากฏบน Tab ของ Browser
  title: "Precision Clock",
  description: "A minimal luxury timepiece.",
  // ไอคอนบน Tab (ถ้าคุณมีไฟล์ favicon.ico)
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} bg-black antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
