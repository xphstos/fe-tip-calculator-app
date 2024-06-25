import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{svelte,js,ts,jsx,tsx}'],
	theme: {
		container: {
			center: true,
			screens: {
				md: '57.5rem'
			}
		},
		colors: {
			inherit: 'inherit',
			current: 'currentColor',
			transparent: 'transparent',
			white: 'hsl(0deg 0% 100% / 1)',
			black: 'hsl(0deg 0% 0% / 1)',
			error: 'hsl(0deg 100% 67% / 1)',
			cyan: {
				DEFAULT: 'hsl(172deg 67% 45% / 1)',
				300: 'hsl(172deg 61% 77% / 1)',
				500: 'hsl(172deg 67% 45% / 1)',
				700: 'hsl(183deg 78% 24% / 1)'
			},
			neutral: {
				DEFAULT: 'hsl(184deg 14% 56% / 1)',
				100: 'hsl(189deg 41% 97% / 1)',
				300: 'hsl(185deg 41% 84% / 1)',
				500: 'hsl(184deg 14% 56% / 1)',
				700: 'hsl(186deg 14% 43% / 1)',
				900: 'hsl(183deg 100% 15% / 1)'
			}
		},
		borderRadius: {
			xs: '.5rem',
			sm: '.875rem',
			lg: '1rem',
			xl: '1.5rem'
		},
		fontFamily: {
			sans: 'system-ui, sans-serif',
			serif: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
			mono: "'Space Mono', ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace"
		},
		fontSize: {
			sm: ['.825rem', { lineHeight: '1.5', fontWeight: '700' }],
			md: ['1rem', { lineHeight: '1.5', fontWeight: '700' }],
			lg: ['1.25rem', { lineHeight: '1.5', fontWeight: '700' }],
			xl: ['1.5rem', { lineHeight: '1.333', fontWeight: '700' }],
			'2xl': ['fluid(2rem,3rem)', { lineHeight: '1', fontWeight: '800' }]
		},
		boxShadow: {
			DEFAULT: '0 1rem 1.5rem hsl(183deg 100% 15% / .05)',
			reverse: '0 -1rem 1.5rem hsl(183deg 100% 15% / .05)'
		},
		extend: {}
	},
	plugins: [
		plugin(({ addVariant }) => {
			addVariant('hocus', ['&:hover', '&:focus']);
			addVariant('hocus-visible', ['&:hover', '&:focus-visible']);
		})
	]
};
