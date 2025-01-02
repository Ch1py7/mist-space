import react from '@vitejs/plugin-react'
import path from 'node:path'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	root: './',
	publicDir: './public',
	resolve: {
		alias: {
			components: path.resolve(__dirname, './src/components'),
		},
	},
	plugins: [react(), UnoCSS()],
})
