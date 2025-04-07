/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6366f1',
          dark: '#4f46e5'
        },
        background: {
          light: '#ffffff',
          dark: '#1a1a1a'
        }
      },
      gradientColorStops: {
        'gradient-1-start': '#6366f1',
        'gradient-1-end': '#8b5cf6',
        'gradient-2-start': '#3b82f6',
        'gradient-2-end': '#6366f1',
        'gradient-3-start': '#14b8a6',
        'gradient-3-end': '#3b82f6'
      }
    },
  },
  plugins: [],
}