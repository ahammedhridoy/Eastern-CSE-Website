import { Inter } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Etheke E-Commerce",
  description: "Loading...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
