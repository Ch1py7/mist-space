// uno.config.ts
import fs from 'node:fs'
import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
	presets: [
		presetIcons({
			cdn: 'https://esm.sh/',
			collections: {
				app: {
					wave: fs.readFileSync('./public/wave.svg', 'utf-8'),
				},
			},
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
		}),
		presetUno(),
	],
})
