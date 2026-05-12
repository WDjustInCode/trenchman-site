import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#AF7618",
        "deep-black": "#080706",
        "athletic-white": "#E3E3E3",
      },
      fontFamily: {
        rockwell: ["'Rockwell Extra Bold'", "Georgia", "serif"],
        bevan: ["var(--font-bevan)", "serif"],
        bebas: ["var(--font-bebas)", "sans-serif"],
        body: ["Calibri", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
