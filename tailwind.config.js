module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // This is important for the dark mode to work
  theme: {
    extend: {
      colors: {
        talento: {
          // Define your talento color palette
          50: '#f0f4f5',
          100: '#dae6ea',
          200: '#b8cfd6',
          300: '#8fb0bc',
          400: '#6a8f9e',
          500: '#527485',
          600: '#3b5e6f',
          700: '#334f5c',
          800: '#2e434d',
          900: '#2a3a42',
        }
      }
    },
  },
  plugins: [],
}