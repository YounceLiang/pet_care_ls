import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        "panel-2": "var(--panel-2)",
        text: "var(--text)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        brand: "var(--brand)",
        "brand-2": "var(--brand-2)",
        good: "var(--good)",
        warn: "var(--warn)",
        bad: "var(--bad)"
      },
      boxShadow: {
        card: "var(--shadow)",
        ring: "var(--ring)"
      },
      borderRadius: {
        xl: "var(--radius)",
        "2xl": "var(--radius-2)"
      }
    }
  },
  plugins: []
};

export default config;
