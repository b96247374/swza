/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
		'./index.html',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem',
				xl: '5rem',
				'2xl': '6rem',
			},
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
			colors: {
				'sa-green': 'var(--sa-green, #14532d)',
				'sa-dark-green': 'var(--sa-dark-green, #14532d)',
				'sa-gold': 'var(--sa-gold, #FFD700)',
				'sa-dark': 'var(--sa-dark, #0a1f0f)',
				'sa-light-green': 'var(--sa-light-green, #008a44)',
				'gold': 'var(--sa-gold, #FFD700)',
				'green': {
					900: 'var(--sa-green, #14532d)',
					800: 'var(--sa-dark-green, #14532d)',
					700: 'var(--sa-light-green, #008a44)',
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1rem',
				'2xl': '1.5rem',
				'3xl': '2rem',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				slideInLeft: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideInRight: {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				slideInUp: {
					'0%': { transform: 'translateY(100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				slideInDown: {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(0)' },
				},
				scaleIn: {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
				bounceIn: {
					'0%': { transform: 'scale(0.3)', opacity: '0' },
					'50%': { transform: 'scale(1.05)' },
					'70%': { transform: 'scale(0.9)' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fadeIn': 'fadeIn 0.5s ease-in-out',
				'slideInLeft': 'slideInLeft 0.3s ease-out',
				'slideInRight': 'slideInRight 0.3s ease-out',
				'slideInUp': 'slideInUp 0.3s ease-out',
				'slideInDown': 'slideInDown 0.3s ease-out',
				'scaleIn': 'scaleIn 0.2s ease-out',
				'bounceIn': 'bounceIn 0.6s ease-out',
				'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
			fontFamily: {
				'arabic': ['var(--primary-font, Cairo)', 'Tahoma', 'Arial', 'sans-serif'],
				'cairo': ['Cairo', 'sans-serif'],
				'tajawal': ['Tajawal', 'sans-serif'],
			},
			fontSize: {
				'xs': ['var(--font-size, 12px)', { lineHeight: '1.4' }],
				'sm': ['var(--font-size, 14px)', { lineHeight: '1.5' }],
				'base': ['var(--font-size, 16px)', { lineHeight: '1.6' }],
				'lg': ['var(--font-size, 18px)', { lineHeight: '1.6' }],
				'xl': ['var(--font-size, 20px)', { lineHeight: '1.5' }],
				'2xl': ['var(--font-size, 24px)', { lineHeight: '1.4' }],
				'3xl': ['var(--font-size, 30px)', { lineHeight: '1.3' }],
				'4xl': ['var(--font-size, 36px)', { lineHeight: '1.2' }],
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			screens: {
				'xs': '475px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			},
			backdropBlur: {
				xs: '2px',
			},
			boxShadow: {
				'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
				'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
				'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
			},
			transitionDuration: {
				'400': '400ms',
				'600': '600ms',
				'800': '800ms',
			},
			transitionTimingFunction: {
				'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		function({ addUtilities, theme }) {
			const newUtilities = {
				'.mobile-optimized': {
					'min-height': '44px',
					'font-size': '16px',
					'touch-action': 'manipulation',
				},
				'.mobile-button': {
					'min-height': '44px',
					'padding': '0.75rem 1rem',
					'font-size': '16px',
					'touch-action': 'manipulation',
				},
				'.mobile-input': {
					'min-height': '44px',
					'font-size': '16px',
					'touch-action': 'manipulation',
				},
				'.mobile-textarea': {
					'min-height': '44px',
					'font-size': '16px',
					'touch-action': 'manipulation',
				},
				'.mobile-select': {
					'min-height': '44px',
					'font-size': '16px',
					'touch-action': 'manipulation',
				},
				'.rtl': {
					'direction': 'rtl',
					'text-align': 'right',
				},
				'.ltr': {
					'direction': 'ltr',
					'text-align': 'left',
				},
				'.arabic-text': {
					'font-family': 'var(--primary-font, Cairo), Tahoma, Arial, sans-serif',
					'direction': 'rtl',
					'text-align': 'right',
				},
				'.glass-effect': {
					'backdrop-filter': 'blur(10px)',
					'background': 'rgba(255, 255, 255, 0.1)',
					'border': '1px solid rgba(255, 255, 255, 0.2)',
				},
				'.btn-primary': {
					'background': 'var(--button-color, #14532d)',
					'color': 'white',
					'padding': '0.75rem 1.5rem',
					'border-radius': '0.5rem',
					'font-weight': '600',
					'transition': 'all 0.2s',
					'border': 'none',
					'cursor': 'pointer',
				},
				'.btn-primary:hover': {
					'background': 'var(--button-color, #14532d)',
					'opacity': '0.9',
					'transform': 'translateY(-1px)',
				},
				'.input-field': {
					'width': '100%',
					'padding': '0.75rem',
					'border': '2px solid var(--sa-gold, #FFD700)',
					'border-radius': '0.5rem',
					'background': 'white',
					'color': 'var(--text-color, #14532d)',
					'font-size': 'var(--font-size, 16px)',
					'transition': 'border-color 0.2s',
				},
				'.input-field:focus': {
					'outline': 'none',
					'border-color': 'var(--sa-green, #14532d)',
					'box-shadow': '0 0 0 3px rgba(20, 83, 45, 0.1)',
				},
			};
			addUtilities(newUtilities);
		},
	],
};