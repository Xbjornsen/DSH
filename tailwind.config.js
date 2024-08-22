/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
theme: {
    extend: {
      colors: {
        'olive': {
          50: '#f7f8f5',
          100: '#e9ede2',
          200: '#d2dbc3',
          300: '#b3c29b',
          400: '#94a674',
          500: '#788c54',
          600: '#5f7141',
          700: '#4d5a35',
          800: '#3f482c',
          900: '#353c26',
        },
        'blue': {
          50: '#f0f3ff',
          100: '#e0e8ff',
          200: '#c7d3ff',
          300: '#a0b4ff',
          400: '#7a8eff',
          500: '#5a6bff',
          600: '#3d45ff',
          700: '#2e34eb',
          800: '#2a2ebd',
          900: '#272e96',
        },
        'yellow': {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
      },
    },
  },
  plugins: [],
}
