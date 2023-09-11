/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#455a63",
        primaryShade: "#5f8192",
        secondary: "#6a103f",
        gray: "#f3f4f6",
      },
    },
  },
  plugins: [],
};
