import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ["'Orbitron'", "sans-serif"],
        body: ["'Rajdhani'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        neon: {
          emerald: "hsl(var(--neon-emerald))",
          cyan: "hsl(var(--neon-cyan))",
          red: "hsl(var(--neon-red))",
          orange: "hsl(var(--neon-orange))",
          green: "hsl(var(--neon-green))",
          purple: "hsl(var(--neon-purple))",
        },
        dosha: {
          vata: "hsl(var(--vata-color))",
          pitta: "hsl(var(--pitta-color))",
          kapha: "hsl(var(--kapha-color))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        scanner: {
          "0%, 100%": { top: "0%" },
          "50%": { top: "100%" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)", opacity: "1" },
          "20%": { transform: "translate(-2px, 2px)", opacity: "0.8" },
          "40%": { transform: "translate(-2px, -2px)", opacity: "0.9" },
          "60%": { transform: "translate(2px, 2px)", opacity: "0.7" },
          "80%": { transform: "translate(2px, -2px)", opacity: "0.9" },
        },
        "pulse-neon": {
          "0%, 100%": { 
            boxShadow: "0 0 5px currentColor, 0 0 10px currentColor",
            opacity: "0.8"
          },
          "50%": { 
            boxShadow: "0 0 20px currentColor, 0 0 40px currentColor",
            opacity: "1"
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        scanner: "scanner 3s ease-in-out infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
        "pulse-neon": "pulse-neon 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
      backgroundImage: {
        "cyber-gradient": "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(240 20% 8%) 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
