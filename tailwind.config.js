/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        popx: {
          purple: '#6C35DE',
          'purple-light': '#C9B8FF',
          'purple-btn': '#7B61FF',
          'purple-hover': '#5a28cc',
          gray: '#F7F8FA',
          'text-gray': '#8A8A8A',
          'label': '#6C35DE',
        }
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
