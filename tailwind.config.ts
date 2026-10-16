import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#E84511",
          orangeDark: "#D9380A",
        },
        surface: {
          light: "#F6F6F6",
          white: "#FFFFFF",
          dark: "#111111",
          cardDark: "#1A1A1A",
          drawer: "#140B08",
        },
        muted: {
          gray: "#8E8E8E",
        },
        border: {
          light: "#E2E2E2",
          dark: "#262626",
          orangeGrid: "rgba(255, 255, 255, 0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
