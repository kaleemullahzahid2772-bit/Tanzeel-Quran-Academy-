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
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
          hover: "var(--color-accent-hover)",
        },
        sky: {
          DEFAULT: "var(--color-sky)",
          light: "var(--color-sky-light)",
        },
        islamicGreen: {
          DEFAULT: "var(--color-green)",
          mid: "var(--color-green-mid)",
          light: "var(--color-green-light)",
        },
        darkBg: {
          DEFAULT: "var(--color-black)",
          soft: "var(--color-black-soft)",
          nav: "var(--color-black-nav)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          raised: "var(--color-surface-raised)",
        },
        customBorder: "var(--color-border)",
        grayMuted: "var(--color-gray-muted)",
      },
      fontFamily: {
        sans: ["var(--font-lato)", "sans-serif"],
        cinzel: ["var(--font-cinzel)", "serif"],
        arabic: ["var(--font-amiri)", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.8s ease-out forwards",
        "shimmer": "shimmer 2.5s infinite linear",
        "pulse-glow": "pulseGlow 2s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 15px rgba(250, 132, 30, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(250, 132, 30, 0.7)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
