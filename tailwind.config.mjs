/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#113065",
        secondary: {
          main: "#EAE2C6",
          light: "#F9F9F3",
        },
        background: {
          white: "#FFFFFF",
          secondary: "#F9F9F3",
        },
      },
    },
  },
  plugins: [],
};
