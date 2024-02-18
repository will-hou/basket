/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#344e41",
        secondary: "#588157",
        tertiary: "#a3B18a",
        warning: "#BC4749",
        background: "#fefae0",
      },
      fontFamily: {
        display: ["Comfortaa"],
        body: ["Open_sans"],
      },
    },
  },
  plugins: [],
};
