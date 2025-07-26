/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,tsx,ts}'],
  theme: {
    extend: {
      colors:{
        primary:'#1f232c',
        'text-primary':'orange'
      }
    },
  },
  plugins: [],
}

