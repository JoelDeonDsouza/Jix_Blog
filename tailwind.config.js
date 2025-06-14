/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['text-jix'],
  theme: {
    extend: {
      colors: {
        jix: '#6c84e4',
      },
    },
  },
  plugins: [],
};
