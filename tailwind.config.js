/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: ["Space Grotesk", "sans-serif"],
        secondaryFont: ["Urbanist", "sans-serif"],
      },
    },
  },
  plugins: [],
};
