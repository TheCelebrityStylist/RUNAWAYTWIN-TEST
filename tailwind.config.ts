import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { brand: { DEFAULT:"#104556", accent:"#DE7600", surface:"#FBFBF6", text:"#433633" } },
      boxShadow: { soft: "0 6px 24px rgba(0,0,0,0.08)" }
    }
  },
  darkMode: "class",
  plugins: []
};
export default config;
