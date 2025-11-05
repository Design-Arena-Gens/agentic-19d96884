import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YouTube AI Cartoon Animation Generator",
  description: "Create engaging animated videos for YouTube with AI-powered cartoon animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
