import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom mental health color palette
        sage: {
          50: '#f6f8f6',
          100: '#e8f0e7',
          200: '#d2e1d0',
          300: '#A8C3A0',
          400: '#9bb896',
          500: '#8aad82',
          600: '#7a9971',
          700: '#667f5e',
          800: '#52654c',
          900: '#43533e',
        },
        forest: {
          50: '#f3f5f3',
          100: '#e4e8e4',
          200: '#c9d2c9',
          300: '#a3b3a3',
          400: '#7a927a',
          500: '#3A5A40',
          600: '#335139',
          700: '#2c4431',
          800: '#253729',
          900: '#1f2e22',
        },
        cream: {
          50: '#fefcfa',
          100: '#FAF3E0',
          200: '#f5e8c4',
          300: '#f0dca8',
          400: '#ebd18c',
          500: '#e6c570',
          600: '#d4b05a',
          700: '#b8944a',
          800: '#9c783a',
          900: '#805c2a',
        },
        sand: {
          50: '#faf8f5',
          100: '#EFD9B4',
          200: '#e8ca9a',
          300: '#e1bb80',
          400: '#daac66',
          500: '#d39d4c',
          600: '#bc8a3f',
          700: '#a17635',
          800: '#86622b',
          900: '#6b4e21',
        },
        dusty: {
          50: '#faf7f7',
          100: '#f2e8e8',
          200: '#e8d2d2',
          300: '#D4A5A5',
          400: '#c99191',
          500: '#be7d7d',
          600: '#b36969',
          700: '#9e5656',
          800: '#834646',
          900: '#683737',
        },
        // Keep existing shadcn colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'sage-gradient': 'linear-gradient(135deg, #A8C3A0, #FAF3E0)',
        'calm-gradient': 'linear-gradient(135deg, #FAF3E0, #EFD9B4)',
        'forest-gradient': 'linear-gradient(135deg, #3A5A40, #A8C3A0)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;