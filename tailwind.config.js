/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FAF8F5',
        emerald: {
          50: '#ECF5F1',
          100: '#D1E7DD',
          200: '#A6D0BE',
          300: '#6FB39A',
          400: '#3D8F74',
          500: '#1F7059',
          600: '#0F5E47',
          700: '#064E3B',
          800: '#053F30',
          900: '#03291F',
        },
        gold: {
          50: '#FBF7E8',
          100: '#F5EBC7',
          200: '#EEDB9C',
          300: '#E5C964',
          400: '#DDBB4A',
          500: '#D4AF37',
          600: '#B38F26',
          700: '#8C6F1C',
          800: '#6B5418',
          900: '#4A3A10',
        },
        charcoal: {
          50: '#F5F5F4',
          100: '#E7E6E4',
          200: '#CFCDCA',
          300: '#A8A59F',
          400: '#7A766F',
          500: '#57534E',
          600: '#44403C',
          700: '#2E2B28',
          800: '#1F1D1B',
          900: '#161513',
        },
        success: { 100: '#DCF2E4', 600: '#2E7D4F', 800: '#1F5A37' },
        warning: { 100: '#FBF0D9', 600: '#A86B12', 800: '#7A4B0B' },
        error: { 100: '#FBE3E1', 600: '#B42318', 800: '#7A1A12' },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0.45)' },
          '70%': { boxShadow: '0 0 0 14px rgba(37, 211, 102, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(37, 211, 102, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'bump': {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 45s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out both',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
        'fade-in': 'fade-in 0.3s ease-out both',
        'slide-in-right': 'slide-in-right 0.35s ease-out both',
        bump: 'bump 0.4s ease-out',
      },
    },
  },
  plugins: [],
};
