/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this is correct
  ],
  theme: {
    extend: {
      fontFamily: {
        jockey: ['"Jockey One"', 'sans-serif'], 
        poppins: ['"Poppins"', 'sans-serif'],
      },
      fontSize: {
        'tiny': '0.625rem',
        'small': '0.7rem', // Example of a custom smaller font size
      },
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};

