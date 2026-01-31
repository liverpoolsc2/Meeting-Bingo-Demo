/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: {
          light: 'rgba(255, 255, 255, 0.1)',
          medium: 'rgba(255, 255, 255, 0.15)',
          heavy: 'rgba(255, 255, 255, 0.2)',
        },
        ai: {
          dark: '#0a0a0f',
          blue: '#0ea5e9',
          cyan: '#22d3ee',
          violet: '#8b5cf6',
        },
      },
      animation: {
        'pulse-fast': 'pulse 0.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-in': 'bounceIn 0.5s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-pulse': 'glowPulse 1.5s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'typing': 'typing 1.2s ease-in-out infinite',
        'wave': 'wave 1.5s ease-in-out infinite',
        'particle-float': 'particleFloat 4s ease-in-out infinite',
        'ring-pulse': 'ringPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ai-gradient': 'aiGradientShift 8s ease infinite',
        'data-stream': 'dataStreamUp 6s linear infinite',
      },
      keyframes: {
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
        glowPulse: {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(168, 85, 247, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(168, 85, 247, 0.6), 0 0 60px rgba(168, 85, 247, 0.4)',
          },
        },
        slideUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideDown: {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        gradientShift: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        typing: {
          '0%, 100%': {
            opacity: '0.3',
          },
          '50%': {
            opacity: '1',
          },
        },
        wave: {
          '0%, 100%': {
            opacity: '0.6',
          },
          '50%': {
            opacity: '1',
          },
        },
        particleFloat: {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: '0.6',
          },
          '25%': {
            transform: 'translate(10px, -10px) rotate(90deg)',
            opacity: '0.8',
          },
          '50%': {
            transform: 'translate(0, -20px) rotate(180deg)',
            opacity: '0.6',
          },
          '75%': {
            transform: 'translate(-10px, -10px) rotate(270deg)',
            opacity: '0.8',
          },
        },
        ringPulse: {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.6',
          },
          '100%': {
            transform: 'scale(1.3)',
            opacity: '0',
          },
        },
        aiGradientShift: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
        dataStreamUp: {
          '0%': {
            transform: 'translateY(100vh)',
            opacity: '0',
          },
          '10%': {
            opacity: '1',
          },
          '90%': {
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100vh)',
            opacity: '0',
          },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-sm': '0 4px 16px 0 rgba(31, 38, 135, 0.2)',
        'glass-lg': '0 12px 48px 0 rgba(31, 38, 135, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.4)',
        'glow-cyan': '0 0 20px rgba(34, 211, 238, 0.4)',
        'glow-pink': '0 0 20px rgba(244, 114, 182, 0.4)',
        'ai-glow': '0 0 30px rgba(14, 165, 233, 0.4)',
      },
      backdropBlur: {
        'glass': '16px',
        'glass-heavy': '24px',
      },
    },
  },
  plugins: [],
}
