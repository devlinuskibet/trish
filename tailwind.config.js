/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff4d88",
        secondary: "#ffccd9",
        accent: "#ffd700",
        background: "#0d021f",
        glass: "rgba(255,255,255,0.12)",
        text: "#ffffff",
        highlight: "#ffedf4"
      },
      fontFamily: {
        heading: ['"Great Vibes"', 'cursive'],
        body: ['"Poppins"', 'sans-serif'],
        quotes: ['"Cormorant Garamond"', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
