/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#344e41",
        background: "#fefae0",
        secondary: "#588157",
        tertiary: "#A3818a",
        warning: "a3818a",
      },
      fontFamily: {
        display: ["Comfortaa"],
        body: ["Open_sans"],
      },
    },
  },
  plugins: [],
};
