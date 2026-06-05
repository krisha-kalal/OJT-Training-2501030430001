/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        cosmos: {
          50: '#fdf2f4',
          100: '#fbe5e9',
          200: '#f7ccd5',
          300: '#f0a3b5',
          400: '#e08295',
          500: '#cb5570',
          600: '#b43a56',
          700: '#972d44',
          800: '#7e283b',
          950: '#05050f',
        },
        dream: {
          50: '#f5f3ff',
          400: '#a78bfa',
          600: '#7c3aed',
          900: '#2d124d',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'subtle-float': 'subtleFloat 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        subtleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
