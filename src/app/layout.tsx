import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Prompt from "../../components/prompt/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Habitap - The plant growing habit tracker",
  description: "A habit tracker that grows a plant when you complete your habits. Grow yourself and your plant at the same time!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1 id="habitap-header">Habitap</h1>
        </header>
        <section className="main">
          {children}
          </section>
      </body>
    </html>
  );
}
