/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // OpenSpace Brand Colors
        brand: {
          blue: '#0039FF',      // Primary electric blue
          lime: '#EDF925',      // Accent lime/yellow
          navy: '#191E2A',      // Dark navy background
          mint: '#BEF5BB',      // Mint green accents
          white: '#FFFFFF',     // Pure white
          cream: '#F9F9F1',     // Off-white/cream
          warm: '#E5E3D8',      // Warm gray
        },
        // Glass system
        glass: {
          light: 'rgba(255, 255, 255, 0.08)',
          medium: 'rgba(255, 255, 255, 0.12)',
          heavy: 'rgba(255, 255, 255, 0.18)',
        },
      },
      animation: {
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'typing': 'typing 1.2s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'particle-rise': 'particleRise 8s linear infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 57, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 57, 255, 0.5), 0 0 60px rgba(0, 57, 255, 0.2)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        typing: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        wave: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        particleRise: {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-10vh) scale(1)', opacity: '0' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
      boxShadow: {
        'brand': '0 4px 24px rgba(0, 57, 255, 0.15)',
        'brand-lg': '0 8px 40px rgba(0, 57, 255, 0.25)',
        'brand-glow': '0 0 30px rgba(0, 57, 255, 0.4)',
        'lime-glow': '0 0 20px rgba(237, 249, 37, 0.4)',
        'mint-glow': '0 0 20px rgba(190, 245, 187, 0.4)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.08), 0 8px 32px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 4px 16px rgba(0, 0, 0, 0.1), 0 16px 48px rgba(0, 0, 0, 0.15)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
