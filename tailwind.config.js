// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: "var(--primary-color)",
        text: "var(--main-text)",
        background: "var(--main-bg)",
      },
    },
  },
  plugins: [],
};
