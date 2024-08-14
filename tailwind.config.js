/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4B37F",
        rock: {
          main: '#2680EA',
          bg: '#211F4F'
        },
        paper: {
          main: '#16C359',
          bg: '#1A381D'
        },
        scissors: {
          main: '#E31542',
          bg: '#50091E'
        }
      },
      animation: {
        fade: "fadeIn 200ms ease-in-out",
      },
      keyframes: () => ({
        fadeIn: {
          "0%": { opacity: "0%" },
          "100%": { opacity: "100%" },
        },
      }),
    },
  },
  plugins: [],
}