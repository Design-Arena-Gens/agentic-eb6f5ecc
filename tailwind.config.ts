import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          foreground: "#F8F5FF"
        },
        accent: {
          DEFAULT: "#14B8A6",
          foreground: "#F0FDFA"
        },
        neutral: {
          900: "#0F172A",
          700: "#1E293B",
          500: "#475569",
          300: "#CBD5F5",
          100: "#F1F5F9"
        }
      },
      animation: {
        pulseSlow: "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      },
      boxShadow: {
        glass: "0 25px 50px -12px rgba(124, 58, 237, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
