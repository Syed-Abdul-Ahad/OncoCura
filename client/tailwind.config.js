/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jockey: ['"Jockey One"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
      },
      fontSize: {
        tiny: "0.625rem",
        small: "0.7rem", // Example of a custom smaller font size
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};

