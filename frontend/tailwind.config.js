/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-yellow": "#f8f7f4",
      },
      fontFamily: {
        Robo: ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
