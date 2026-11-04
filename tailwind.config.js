/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F7FE',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          primary: '#4318FF',
          accent: '#4880FF',
        },
        sidebar: {
          bg: '#FFFFFF',
          active: '#F4F7FE',
          text: '#707EAE',
          activeText: '#4318FF',
        },
        navy: {
          50: '#F4F7FE',
          100: '#E9EDF7',
          200: '#DCE4F5',
          300: '#C1CEEC',
          500: '#707EAE',
          700: '#2B3674',
          800: '#1B2559',
          900: '#0B1437',
        },
        badge: {
          completeBg: '#E8F8EE',
          completeText: '#22C55E',
          pendingBg: '#FFF4E5',
          pendingText: '#F59E0B',
          cancelBg: '#FFEBEB',
          cancelText: '#EF4444',
          cyanBg: '#E6F8FF',
          cyanText: '#00B5FF',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0px 18px 40px rgba(112, 144, 176, 0.10)',
        'card': '0px 8px 30px rgba(0, 0, 0, 0.04)',
        'popup': '0px 24px 48px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      }
    },
  },
  plugins: [],
}

