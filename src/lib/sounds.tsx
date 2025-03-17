import {
	Bird,
	Cat,
	Cloud,
	Coffee,
	Dog,
	Droplets,
	Flame,
	Music,
	Trees,
	Umbrella,
	Waves,
	Wind,
} from 'lucide-react'

export interface Audio {
	id: string
	name: string
	icon: React.ReactNode
	color: string
	src: string
}

export const audios: Record<string, Audio[]> = {
	nature: [
		{
			id: 'rain',
			name: 'Rain',
			icon: <Droplets size={20} />,
			color: '#a5d8ff',
			src: '/audios/rain.mp3',
		},
		{
			id: 'thunder',
			name: 'Thunder',
			icon: <Cloud size={20} />,
			color: '#748ffc',
			src: '/audios/thunder.mp3',
		},
		{
			id: 'forest',
			name: 'Forest',
			icon: <Trees size={20} />,
			color: '#69db7c',
			src: '/audios/forest.mp3',
		},
		{
			id: 'birds',
			name: 'Birds',
			icon: <Bird size={20} />,
			color: '#ffd43b',
			src: '/audios/birds.mp3',
		},
		{
			id: 'waves',
			name: 'Ocean Waves',
			icon: <Waves size={20} />,
			color: '#4dabf7',
			src: '/audios/waves.mp3',
		},
		{
			id: 'wind',
			name: 'Wind',
			icon: <Wind size={20} />,
			color: '#e9ecef',
			src: '/audios/wind.mp3',
		},
	],
	ambient: [
		{
			id: 'whitenoise',
			name: 'White Noise',
			icon: <Wind size={20} />,
			color: '#f8f9fa',
			src: '/audios/whitenoise.mp3',
		},
		{
			id: 'fireplace',
			name: 'Fireplace',
			icon: <Flame size={20} />,
			color: '#ff922b',
			src: '/audios/bonfire.mp3',
		},
		{
			id: 'spaceship',
			name: 'Spaceship',
			icon: <Music size={20} />,
			color: '#845ef7',
			src: '/audios/spaceship.mp3',
		},
		{
			id: 'meditation',
			name: 'Meditation',
			icon: <Music size={20} />,
			color: '#9775fa',
			src: '/audios/meditation.mp3',
		},
	],
	urban: [
		{
			id: 'cafe',
			name: 'Cafe',
			icon: <Coffee size={20} />,
			color: '#e599f7',
			src: '/audios/cafe.mp3',
		},
		{
			id: 'cityrain',
			name: 'City Rain',
			icon: <Umbrella size={20} />,
			color: '#74c0fc',
			src: '/audios/cityrain.mp3',
		},
		{
			id: 'keyboard',
			name: 'Keyboard',
			icon: <Music size={20} />,
			color: '#ced4da',
			src: '/audios/keyboard.mp3',
		},
		{
			id: 'traffic',
			name: 'Traffic',
			icon: <Music size={20} />,
			color: '#adb5bd',
			src: '/audios/traffic.mp3',
		},
	],
	asmr: [
		{
			id: 'catpurr',
			name: 'Cat Purring',
			icon: <Cat size={20} />,
			color: '#ffa8a8',
			src: '/audios/catpurr.mp3',
		},
		{
			id: 'pages',
			name: 'Page Turning',
			icon: <Music size={20} />,
			color: '#f8f9fa',
			src: '/audios/pages.mp3',
		},
		{
			id: 'whisper',
			name: 'Whispers',
			icon: <Music size={20} />,
			color: '#dee2e6',
			src: '/audios/whisper.mp3',
		},
		{
			id: 'dogbreath',
			name: 'Dog Breathing',
			icon: <Dog size={20} />,
			color: '#ffc078',
			src: '/audios/dogbreath.mp3',
		},
	],
}
