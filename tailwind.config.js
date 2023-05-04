/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      Raleway: 'Raleway, sans-serif',
    },
    colors: {
      white: '#fff',
      primary: '#5ECE7B',
      text: '#1D1F22',
      light: '#a7fabd',
      dark: '#2f613c',
      transparent: 'transparent'
    },
  },
  plugins: [],
};
