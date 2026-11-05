import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.tsx", "./components/**/*.tsx", "./lib/**/*.ts", "./hooks/**/*.ts"],
  theme: {
    extend: {
      colors: { olive: "#565644", cream: "#FBF8F1", sand: "#EFE6D6", gold: "#B89A5B", ink: "#1F3A4B", mint: "#D3E7DC" },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-arabic)", "sans-serif"],
        display: ["var(--font-playfair)", "var(--font-arabic)", "serif"],
      },
    }
  },
  plugins: [],
} satisfies Config;
