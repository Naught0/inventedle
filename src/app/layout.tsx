import { Hyperlink } from "@/components/hyperlink";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const lora = Lora({
  weight: "400",
  variable: "--font-lora",
  subsets: ["latin"],
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
        className={`dark ${lora.variable} ${geistMono.variable} antialiased`}
      >
        <Nav />
        <main className="flex min-h-screen w-full flex-grow flex-col items-center gap-6 pb-12 font-sans lg:pb-24">
          <div className="flex w-full max-w-screen-lg flex-grow">
            {children}
          </div>
        </main>
        <footer className="bg-secondary flex flex-col items-center gap-6 py-36 text-center text-xs lg:text-sm">
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
