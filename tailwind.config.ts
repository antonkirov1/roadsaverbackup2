import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				roadsaver: {
					primary: '#9B87F5',
					green: '#8BC34A',
					red: '#EA384C',
					blue: '#0EA5E9',
					darkGray: '#333333',
					lightGray: '#F1F1F1',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-subtle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
        'deflate-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.9)' },
        },
        'fuel-flicker': {
          '0%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0.6' },
          '50%': { opacity: '0.8' },
        },
        'fuel-empty-flash': {
          '0%, 100%': { color: 'currentColor', opacity: '1' },
          '50%': { color: 'theme("colors.roadsaver.red")', opacity: '0.7' },
        },
        'battery-flash-red': {
          '0%, 100%': { color: 'currentColor' },
          '50%': { color: 'theme("colors.roadsaver.red")' },
        },
        'wrench-turn': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        'truck-rumble': {
          '0%, 100%': { transform: 'translateX(0px)' },
          '25%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(0px)' },
          '75%': { transform: 'translateX(2px)' },
        },
        'phone-ring': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'rotate(-10deg)' },
          '20%, 40%, 60%, 80%': { transform: 'rotate(10deg)' },
        },
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'deflate-pulse': 'deflate-pulse 1.8s ease-in-out infinite',
        'fuel-flicker': 'fuel-flicker 1.2s ease-in-out infinite', // Kept old one
        'fuel-empty-flash': 'fuel-empty-flash 1.5s ease-in-out infinite', // New animation utility
        'battery-flash-red': 'battery-flash-red 1.5s ease-in-out infinite',
        'wrench-turn': 'wrench-turn 2.5s ease-in-out infinite alternate',
        'truck-rumble': 'truck-rumble 0.6s linear infinite alternate',
        'phone-ring': 'phone-ring 1.3s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
