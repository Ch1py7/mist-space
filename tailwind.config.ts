/** @type {import('tailwindcss').Config} */
export const content: string[] = ['./src/**/*.{html,js,tsx}']
export const theme = {
	extend: {
		screens: {
			xs: '512px',
			xxs: '384px',
			xxxs: '256px',
			toast: '480px',
		},
		colors: {
			disabled: '#9ca3af',
		},
	},
}
export const plugins: [] = []
