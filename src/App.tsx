import { Howl } from 'howler'
import { useMemo } from 'react'
import { SoundPositioner } from './components/SoundCard'

const defaultVolume = 0.5

const audios = [
	{ id: 'sound1', src: '/bonfire.mp3', label: 'Bonfire' },
	{ id: 'sound2', src: '/city-ambience.mp3', label: 'City Ambience' },
	{ id: 'sound3', src: '/crickets.mp3', label: 'Crickets' },
	{ id: 'sound4', src: '/fire-crackling.mp3', label: 'Fire Crackling' },
	{ id: 'sound5', src: '/flowing-water.mp3', label: 'Flowing Water' },
	{ id: 'sound6', src: '/night-cyprus-sea.mp3', label: 'Night Cyprus Sea' },
	{ id: 'sound7', src: '/old-train.mp3', label: 'Old Train' },
	{ id: 'sound8', src: '/rain.mp3', label: 'Rain' },
	{ id: 'sound9', src: '/sea-wave.mp3', label: 'Sea Wave' },
	{ id: 'sound10', src: '/umbrella-rain.mp3', label: 'Umbrella Rain' },
	{ id: 'sound11', src: '/waterfall.mp3', label: 'Waterfall' },
	{ id: 'sound12', src: '/wind-chimes.mp3', label: 'Wind Chimes' },
]

export const App: React.FC = (): React.ReactElement => {
	const sounds = useMemo(() => {
		return audios.reduce(
			(acc, { id, src }) => {
				acc[id] = new Howl({ src: [src], volume: defaultVolume, loop: true })
				return acc
			},
			{} as Record<string, Howl>
		)
	}, [])

	return (
		<div className="min-h-screen bg-black text-white">
			<div className="container mx-auto px-4 py-12">
				<header className="mb-16 border-b-4 border-white border-b-solid pb-8">
					<div className="flex items-center gap-4 mb-4 ">
						<span className="w-12 h-12 p-2 i-app-wave" />
						<h1 className="text-6xl font-mono uppercase tracking-tighter">MIST.SPACE</h1>
					</div>
					<p className="text-xl font-mono ml-[76px]">AMBIENT SOUND SYSTEM_</p>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					{audios.map((sound) => (
						<div key={sound.id} className="relative">
							<SoundPositioner sound={sounds[sound.id]} audioUrl={sound.src} />
							<div className="mt-4 flex justify-between items-center">
								<p className="font-mono text-2xl">{sound.label}</p>
								<label className="flex items-center gap-2">
									<span className="i-carbon-volume-up w-6 h-6" />
									<input
										type="range"
										className="w-32 accent-white hover:accent-teal-400"
										defaultValue={sounds[sound.id].volume() * 100}
										onChange={(e) => {
											const volume = Number.parseFloat(e.target.value) / 100
											sounds[sound.id].volume(volume)
										}}
									/>
								</label>
							</div>
						</div>
					))}
				</div>
				<footer className="mt-24 border-t-solid border-t-4 border-white pt-8 flex justify-between">
					<p className="font-mono text-xl uppercase">
						SYSTEM STATUS: <span className="text-teal-400">OPERATIONAL</span>
					</p>
					<p className="font-mono text-xl uppercase">
						MADE WITH{' '}
						<span className="inline-block text-red-500 transition-all duration-300 ease-in-out hover:scale-120 hover:[text-shadow:0_0_0.6rem_#ff0000]">
							❤️
						</span>{' '}
						BY:{' '}
						<a
							href="https://github.com/Ch1py7"
							className="text-teal-400 decoration-none transition-all duration-150 hover:text-green-400"
							target="_blank"
							rel="noreferrer"
						>
							bulbsum
						</a>
					</p>
				</footer>
			</div>
		</div>
	)
}
