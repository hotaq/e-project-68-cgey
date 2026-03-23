import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Pro-Skills",
  description: "Landing page hero inspired by the supplied Figma mockup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-screen flex-col items-center overflow-x-auto">
        {children}
      </body>
    </html>
  );
}
