import { shadcnTheme } from "./path/to/shadcn-theme"; // se você tem

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
      },
    },
  },
  plugins: [],
};
