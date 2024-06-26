/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      fontSize: {
        sm: "0.8rem",
        base: "0.6rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
      boxShadow: {
        custom: " 1px 1px 3px gray",
      },
      colors: {
        "primary-color": "var(--primary-color)",
        background: "var(--background-color)",
        primary: "var(--text-muted-color)",
      },
      backgroundColor: {
        skin: {
          base: "var(--primary-color)",
          active: "var(--primary-color-shade100)",
          shade50: "var(--primary-color-shade50)",
        },
      },
      textColor: {
        skin: {
          base: "var(--text-muted-color)",
          active: "var(--primary-color)",
        },
      },
    },
  },
  plugins: [],
};
