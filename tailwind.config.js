/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        desktop: "1280px",
      },
      colors: {
        "white": "#fff",
        "white-dark": "#f4f4f4",
        "gray-light": "#7A7A7A",
        "gray-dark": "#383838",
        "gray-border": "#d6d6d6",
        "blue-light": "#1a6baf",
        "blue-dark": "#15568c",
        "blue-wavy": "#0bf",
        "green-light": "#7fc243",
        "green-dark": "#669b36",
        "orange-light": "#f78931",
        "orange-dark": "#ef8129",
        "red-light": "#f3e5e5",
        "red-dark": "#c55a5a",
      },
    },
  },
  plugins: [],
};
