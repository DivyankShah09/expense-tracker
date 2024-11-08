/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        primary: '#b189fa',
        header: '#E6E6E6',
        footer: '#c3e1f6',
        primaryHover: '#4C3C82',
        selected: '#f5e8ff'
      },
      textColor: {
        logo: '#b189fa',
        primary: '#595298',
        buttonText: '#ffffff',
        secondary: '#7F8C8D',
      },
      borderRadius: {
        none: '0',
        sm: '.125rem',
        DEFAULT: '.25rem',
        lg: '.5rem',
        full: '9999px',
      },
      fontSize: {
        sm: '14px',
        header: '30px',
        base: '16px',
        lg: '20px',
        xlg: '32px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      fontWeights: {
        thin: 200,
        light: 300,
        medium: 500,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
      boxShadow: {
        'right': '6px 0px 5px 0px rgba(177, 137, 250, 0.4)',  // Right side shadow
      },
    },
  },
  plugins: [],
};