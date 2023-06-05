/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      'tablet': '768px',
      'desktop': '1280px'
    },
    colors: {
      'white': "#fff",
      'white-dark': "#f4f4f4",
      "gray-light": "7A7A7A",
      "gray-dark": "#383838",
      "blue-light": "#1a6baf",
      "blue-dark": "#15568c",
      "green-light": "#7fc243",
      "green-dark": "#669b36",
      "orange-light": "#ef8129",
      "orange-dark": "#f78931",
    },
  },
  plugins: [],
};
