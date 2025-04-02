/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        epilogue: ['Epilogue', 'sans-serif'],
      },
      boxShadow: {
        secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
      },
      colors: {
        'black-bg': '#13131a',
        'black-1': '#1c1c24',
        'black-2': '#3a3a43',
        'light-purple': '#8c6dfd',
        'green-1': '#1dc071',
        'green-2': '#4acd8b',
        'grey-1': '#2c2f32',
        'modal-bg': 'rgba(0,0,0,0.7)',
        'grey-2': '#28282e',
        'primary-text': '#808191',
        'secondary-text': '#818183',
        'placeholder-text': '#4b5264',
        'tertiary-text': '#b2b3bd',
        'civil-blue': '#3A465B'
      }
    },
  },
  plugins: [],
};
