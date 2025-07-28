import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Creditmonks CRM",
  description: "Customer Relationship Management System for Lead Processing and Team Management",
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
