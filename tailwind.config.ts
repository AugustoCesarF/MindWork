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
        primary: {
          50: "#E8F4F6",
          100: "#C5E4E9",
          200: "#9DD1D9",
          300: "#74BDC9",
          400: "#4FA9B8",
          500: "#1A6B7A",
          600: "#0F4C5C",
          700: "#0D4150",
          800: "#0A3540",
          900: "#072830",
          950: "#041A20",
          DEFAULT: "#0F4C5C",
          light: "#1A6B7A",
          dark: "#0A3540",
        },
        secondary: {
          50: "#EDF5F1",
          100: "#D4E8DE",
          200: "#B8D9C8",
          300: "#9CCAB2",
          400: "#7FBA9C",
          500: "#5B8A72",
          600: "#4E7662",
          700: "#416252",
          800: "#344E42",
          900: "#273A32",
          950: "#1A2721",
          DEFAULT: "#5B8A72",
        },
        accent: {
          50: "#E6F9FB",
          100: "#C2F0F5",
          200: "#9AE6EE",
          300: "#6ECEDA",
          400: "#55C3D1",
          500: "#3BB0BF",
          600: "#2E8D99",
          700: "#236B73",
          800: "#17484D",
          900: "#0C2427",
          DEFAULT: "#6ECEDA",
        },
        success: {
          50: "#EFF6F2",
          100: "#D7EAE0",
          200: "#BDDCCC",
          300: "#A1CDB7",
          400: "#81B29A",
          500: "#6A9D84",
          600: "#55806B",
          700: "#406252",
          800: "#2B4339",
          900: "#162220",
          DEFAULT: "#81B29A",
        },
        warning: {
          50: "#FDF8EE",
          100: "#FAEFD6",
          200: "#F7E4BC",
          300: "#F2CC8F",
          400: "#EDB96A",
          500: "#E5A244",
          600: "#C4832B",
          700: "#946221",
          800: "#644216",
          900: "#34220B",
          DEFAULT: "#F2CC8F",
        },
        danger: {
          50: "#FCEFEC",
          100: "#F8D9D2",
          200: "#F1B8AB",
          300: "#E99784",
          400: "#E07A5F",
          500: "#D25D3F",
          600: "#B04430",
          700: "#853324",
          800: "#5A2218",
          900: "#2F120C",
          DEFAULT: "#E07A5F",
        },
        severe: {
          50: "#FDE8EA",
          100: "#FABCC1",
          200: "#F39099",
          300: "#EC6370",
          400: "#E63946",
          500: "#CF2433",
          600: "#A91D2A",
          700: "#821620",
          800: "#5C1017",
          900: "#35090D",
          DEFAULT: "#E63946",
        },
      },
      fontFamily: {
        inter: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        outfit: ["var(--font-outfit)", "Outfit", "system-ui", "sans-serif"],
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-out forwards",
        slideUp: "slideUp 0.4s ease-out forwards",
        pulseAlert: "pulseAlert 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseAlert: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #0F4C5C 0%, #1A6B7A 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, #5B8A72 0%, #81B29A 100%)",
        "gradient-accent":
          "linear-gradient(135deg, #6ECEDA 0%, #3BB0BF 100%)",
        "gradient-danger":
          "linear-gradient(135deg, #E07A5F 0%, #E63946 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0F4C5C 0%, #1A6B7A 50%, #6ECEDA 100%)",
        "gradient-body":
          "linear-gradient(180deg, #F8FAFB 0%, #EFF5F3 50%, #F0F7FA 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 76, 92, 0.08)",
        "glass-hover": "0 12px 40px rgba(15, 76, 92, 0.15)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.06)",
        elevated: "0 10px 40px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
