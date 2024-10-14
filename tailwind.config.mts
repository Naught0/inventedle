import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        indian_red: {
          DEFAULT: "#b4656f",
          100: "#261315",
          200: "#4b252a",
          300: "#71383f",
          400: "#964a54",
          500: "#b4656f",
          600: "#c2848c",
          700: "#d2a3a9",
          800: "#e1c1c6",
          900: "#f0e0e2",
        },
        eerie_black: {
          DEFAULT: "#1c1f22",
          100: "#060607",
          200: "#0b0c0d",
          300: "#111214",
          400: "#16181b",
          500: "#1c1f22",
          600: "#444b53",
          700: "#6c7884",
          800: "#9ca5ae",
          900: "#ced2d7",
        },
        non_photo_blue: {
          DEFAULT: "#a8dadc",
          100: "#163637",
          200: "#2c6d6f",
          300: "#42a3a6",
          400: "#70c3c6",
          500: "#a8dadc",
          600: "#b9e2e3",
          700: "#cae9ea",
          800: "#dcf0f1",
          900: "#edf8f8",
        },
        french_gray: {
          DEFAULT: "#bcc4db",
          100: "#1d2335",
          200: "#39456a",
          300: "#56689f",
          400: "#8895bf",
          500: "#bcc4db",
          600: "#cad0e2",
          700: "#d7dcea",
          800: "#e4e8f1",
          900: "#f2f3f8",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
