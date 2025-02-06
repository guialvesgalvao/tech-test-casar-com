import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "var(--primary)",
        "primary-ligth": "var(--primary-ligth)",
        "primary-dark": "var(--primary-dark)",
        placeholder: "var(--placeholder)",
        "grey-neutral": "var(--grey-neutral)",
        "grey-dark": "var(--grey-dark)",
        "white-bg-ligth": "var(--white-bg-ligth)",
        "white-bg-matte": "var(--white-bg-matte)",
        "custom-border": "var(--custom-border)",
        success: "var(--success)",
        warning: "var(--warning)",
        danger: "var(--danger)",
        
      },
    },
  },
  plugins: [],
} satisfies Config;
