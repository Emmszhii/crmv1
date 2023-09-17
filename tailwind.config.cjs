/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#455a63",
        primaryShade: "#5f8192",
        secondary: "#6a103f",
        success: "#188351",
        alert: "#b91c1c",
        alert_darker: "#a51515",
        warning: "#f09a02",
        archive: "#d4c3af	",
        dark: "#3a3b36",
      },
    },
  },
  plugins: [],
};
