/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts,tsx,js,jsx,scss,css}'],
  theme: {
    extend: {
      colors: {
        customGray1: '#F6F8F9',
        customGray2: '#EFF0F3',
        textGray1: '#7B8599',
        textGray2: '#BBBCC3',
        textBlue1: '#2E88FD',
        customBlue1: '#157AFF',
      }
    },
  },
  plugins: [],
};

