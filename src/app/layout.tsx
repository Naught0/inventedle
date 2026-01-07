import { Hyperlink } from "@/components/hyperlink";
import { Nav } from "@/components/nav";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Atkinson_Hyperlegible_Next } from "next/font/google";
import "./globals.css";
import { Help } from "@/components/help";
import { QueryContext } from "@/components/hooks/query";
import { SigninButton } from "@/components/signin-button";
import Script from "next/script";

const mono = JetBrains_Mono({
  weight: ["500", "800"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const sans = Atkinson_Hyperlegible_Next({
  weight: ["500", "800"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Inventedle",
  description: "The inventurous daily guessing game",
  icons: {
    icon: { href: "/favicon.ico", url: "/favicon.ico" },
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-gradient dark ${sans.variable} ${mono.variable} font-sans antialiased`}
      >
        <Nav />
        <main className="mb-12 flex w-full flex-col items-center justify-start gap-3 p-3 pb-12 font-sans">
          <aside className="flex items-center justify-center">
            <Help />
          </aside>
          <QueryContext>
            <SigninButton />
            <div className="flex min-h-[50vh] w-full max-w-screen-sm justify-center lg:max-w-screen-lg">
              {children}
            </div>
          </QueryContext>
        </main>
        <footer>
          <div className="-mb-1 w-full">
            <Wave />
          </div>
          <div className="bg-primary-dark flex h-full w-full flex-col items-center gap-6 px-6 py-36 text-center text-xs lg:text-sm">
            <p>
              this project is{" "}
              <Hyperlink
                href="https://github.com/Naught0/inventedle"
                alt="website source"
              >
                open source!
              </Hyperlink>
            </p>
            <div className="text-left">
              <p>inventions retrieved from:</p>
              <ul className="ml-3.5 list-outside list-disc">
                <li>
                  <Hyperlink href="https://www.britannica.com">
                    encyclopedia britannica®
                  </Hyperlink>
                </li>
              </ul>
            </div>
            <p>
              inventedle is in no way related to or endorsed by britannica® or
              by any other sources
            </p>
          </div>
        </footer>
      </body>
      <Script defer src="https://plausible.jamese.dev/js/script.js"></Script>
    </html>
  );
}

function Wave() {
  // fill="hsl(var(--primary-dark))"
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path
        fill="hsl(var(--primary-dark))"
        fillOpacity="1"
        d="M0,128L24,122.7C48,117,96,107,144,122.7C192,139,240,181,288,213.3C336,245,384,267,432,277.3C480,288,528,288,576,288C624,288,672,288,720,245.3C768,203,816,117,864,117.3C912,117,960,203,1008,218.7C1056,235,1104,181,1152,176C1200,171,1248,213,1296,224C1344,235,1392,213,1416,202.7L1440,192L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
      ></path>
    </svg>
  );
}
