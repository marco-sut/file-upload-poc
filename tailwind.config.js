/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./cypress/support/component-index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

