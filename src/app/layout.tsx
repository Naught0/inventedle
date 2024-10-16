import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Hyperlink } from "@/components/hyperlink";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Inventle",
  description: "the inventurous daily guessing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="flex min-h-screen flex-1 flex-col gap-6 pb-12 pt-6 lg:pb-24 lg:pt-12">
          {children}
        </main>
        <footer className="bg-secondary flex flex-col items-center justify-center gap-6 py-36 text-xs lg:text-sm">
          <p>
            this project is{" "}
            <Hyperlink
              href="https://github.com/Naught0/inventedle"
              alt="website source"
            >
              open source!
            </Hyperlink>
          </p>
          <p>
            images from{" "}
            <Hyperlink href="https://commons.wikimedia.org/">
              wikimedia commons
            </Hyperlink>{" "}
            and <Hyperlink href="https://pexels.com/">pexels</Hyperlink> where
            noted
          </p>
        </footer>
      </body>
    </html>
  );
}
