/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#4B0082', // Indigo - creative authority and professional depth
        'primary-50': '#F3E8FF', // Ultra light indigo for backgrounds - violet-50
        'primary-100': '#E9D5FF', // Light indigo for hover states - violet-100
        'primary-200': '#DDD6FE', // Lighter indigo for subtle accents - violet-200
        'primary-300': '#C4B5FD', // Medium light indigo - violet-300
        'primary-400': '#A78BFA', // Medium indigo - violet-400
        'primary-500': '#8B5CF6', // Standard indigo - violet-500
        'primary-600': '#7C3AED', // Darker indigo - violet-600
        'primary-700': '#6D28D9', // Deep indigo - violet-700
        'primary-800': '#5B21B6', // Very dark indigo - violet-800
        'primary-900': '#4C1D95', // Darkest indigo - violet-900
        
        'secondary': '#191970', // Midnight Blue - stable foundation with corporate appeal
        'secondary-50': '#F0F4FF', // Ultra light midnight blue
        'secondary-100': '#E0E7FF', // Light midnight blue
        'secondary-200': '#C7D2FE', // Lighter midnight blue
        'secondary-300': '#A5B4FC', // Medium light midnight blue
        'secondary-400': '#818CF8', // Medium midnight blue
        'secondary-500': '#6366F1', // Standard midnight blue
        'secondary-600': '#4F46E5', // Darker midnight blue
        'secondary-700': '#4338CA', // Deep midnight blue
        'secondary-800': '#3730A3', // Very dark midnight blue
        'secondary-900': '#312E81', // Darkest midnight blue
        
        'accent': '#B8860B', // Dark Goldenrod - premium interaction points
        'accent-50': '#FFFBEB', // Ultra light goldenrod - amber-50
        'accent-100': '#FEF3C7', // Light goldenrod - amber-100
        'accent-200': '#FDE68A', // Lighter goldenrod - amber-200
        'accent-300': '#FCD34D', // Medium light goldenrod - amber-300
        'accent-400': '#FBBF24', // Medium goldenrod - amber-400
        'accent-500': '#F59E0B', // Standard goldenrod - amber-500
        'accent-600': '#D97706', // Darker goldenrod - amber-600
        'accent-700': '#B45309', // Deep goldenrod - amber-700
        'accent-800': '#92400E', // Very dark goldenrod - amber-800
        'accent-900': '#78350F', // Darkest goldenrod - amber-900
        
        // Background Colors
        'background': '#FEFEFE', // Near White - clean canvas enhancing color vibrancy
        'surface': '#F8F9FA', // Light Gray - content areas with subtle elevation - gray-50
        
        // Text Colors
        'text-primary': '#1A1A1A', // Near Black - maximum readability - gray-900
        'text-secondary': '#6B7280', // Medium Gray - supporting information hierarchy - gray-500
        
        // Status Colors
        'success': '#059669', // Emerald - positive actions and achievements - emerald-600
        'warning': '#D97706', // Amber - important information alerts - amber-600
        'error': '#DC2626', // Red - issues and required actions - red-600
      },
      fontFamily: {
        'heading': ['Playfair Display', 'serif'],
        'body': ['Inter', 'sans-serif'],
        'caption': ['Source Sans Pro', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'royal': '4px',
        'royal-md': '8px',
        'royal-lg': '12px',
      },
      boxShadow: {
        'royal-sm': '0 1px 3px rgba(75, 0, 130, 0.1), 0 1px 2px rgba(75, 0, 130, 0.06)',
        'royal': '0 4px 6px rgba(75, 0, 130, 0.1), 0 2px 4px rgba(75, 0, 130, 0.06)',
        'royal-md': '0 10px 15px rgba(75, 0, 130, 0.1), 0 4px 6px rgba(75, 0, 130, 0.05)',
        'royal-lg': '0 20px 25px rgba(75, 0, 130, 0.1), 0 10px 10px rgba(75, 0, 130, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'royal-shimmer': 'royalShimmer 2s ease-in-out infinite',
        'scroll-progress': 'scrollProgress 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        royalShimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        scrollProgress: {
          '0%': { width: '0%' },
          '100%': { width: 'var(--scroll-progress)' },
        },
      },
      transitionTimingFunction: {
        'royal': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
      },
      zIndex: {
        '100': '100',
        '150': '150',
        '200': '200',
        '300': '300',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}