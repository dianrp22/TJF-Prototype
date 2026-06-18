import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tjf: {
          blue: "#1A4F8A",
          "blue-dark": "#0F3460",
          "blue-light": "#2E6BB0",
          "blue-pale": "#EBF2FA",
          green: "#2D7D46",
          "green-light": "#E8F5EC",
          amber: "#D97706",
          "amber-light": "#FEF3C7",
          gray: "#6B7280",
          "gray-light": "#F9FAFB",
        },
      },
      fontFamily: {
        sans:    ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        display: ["Fraunces", "Georgia", "serif"],
      },
      boxShadow: {
        "glow-blue": "0 0 30px rgba(26, 79, 138, 0.2)",
        "glow-green": "0 0 30px rgba(45, 125, 70, 0.2)",
        "card": "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 12px 40px rgba(0,0,0,0.12)",
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #0F3460 0%, #1A4F8A 50%, #2E6BB0 100%)",
        "card-gradient": "linear-gradient(135deg, #EBF2FA 0%, #ffffff 100%)",
      },
      animation: {
        "fade-up":  "fadeUp 0.5s ease-out",
        "fade-in":  "fadeIn 0.4s ease-out",
        "marquee":  "marquee 30s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
