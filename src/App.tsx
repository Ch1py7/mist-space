import { Howl } from 'howler'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { ActiveCard } from './components/ActiveCard'
import { BrutalismCard } from './components/BrutalismCard'
import { SoundLibrary } from './components/SoundLibrary'
import { SoundPositioner } from './components/SoundPositioner'
import { type Audio, audios } from './lib/sounds'

const defaultVolume = 0.5

export interface ActiveSounds {
	id: string
	name: string
	icon: React.ReactNode
	color: string
	position: { x: number; y: number; z: number }
	volume: number
}

export const App: React.FC = (): React.ReactElement => {
	const [masterMuted, setMasterMuted] = useState<boolean>(false)
	const [masterVolume, setMasterVolume] = useState<number>(0.5)
	const [sounds, setSounds] = useState<Audio[]>([])
	const [activeSounds, setActiveSounds] = useState<ActiveSounds[]>([])
	const [isPlaying, setIsPlaying] = useState(true)

	const howlSounds = useMemo(() => {
		return sounds.reduce(
			(acc, { id, src }) => {
				acc[id] = new Howl({ src: [src], volume: defaultVolume, loop: true })
				return acc
			},
			{} as Record<string, Howl>
		)
	}, [sounds])

	const handleAddSound = (sound: Audio) => {
		if (activeSounds.some((active) => active.id === sound.id)) return

		setActiveSounds((prev) => [
			...prev,
			{
				...sound,
				position: { x: 50, y: 50, z: 0 },
				volume: defaultVolume,
			},
		])
		howlSounds[sound.id]?.play()
	}

	const pauseSounds = () => {
		setIsPlaying((prev) => {
			activeSounds.forEach((active) => {
				if (!prev) {
					howlSounds[active.id].play()
				} else {
					howlSounds[active.id].pause()
				}
			})
			return !prev
		})
	}

	const muteSounds = () => {
		setMasterMuted((prev) => {
			activeSounds.forEach((active) => howlSounds[active.id].mute(!prev))
			return !prev
		})
	}

	useEffect(() => {
		const keys = Object.keys(audios)
		const flatAudios = keys.flatMap((k) => audios[k])

		setSounds(flatAudios)
	}, [])

	useEffect(() => {
		activeSounds.forEach((active) => {
			const howl = howlSounds[active.id]
			if (!howl.playing()) {
				howl.play()
			}
		})
	}, [activeSounds, howlSounds])

	useEffect(() => {
		activeSounds.forEach((active) => {
			const howl = howlSounds[active.id]
			const adjusteVolume = active.volume * masterVolume
			howl.volume(adjusteVolume)
		})
	}, [activeSounds, howlSounds, masterVolume])

	return (
		<div className='min-h-screen bg-[#f0f0f0] p-4 xs:p-6'>
			<div className='max-w-7xl mx-auto'>
				<header className='mb-8'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl font-black text-black mb-2 tracking-tight'>
						AMBIENT SPACE
					</h1>
					<p className='text-lg sm:text-xl font-bold text-[#333]'>Create your perfect soundscape</p>
				</header>
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
					<BrutalismCard>
						<h2 className='text-xl sm:text-2xl font-bold mb-4'>SOUND LIBRARY</h2>
						<SoundLibrary onAddSound={handleAddSound} />
					</BrutalismCard>
					<BrutalismCard className='lg:col-span-2'>
						<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4'>
							<h2 className='text-2xl font-bold'>SOUND SPACE</h2>
							<div className='grid gap-4 grid-cols-2 xs:grid-cols-3 w-full md:w-auto items-center'>
								<button
									title={isPlaying ? 'pause' : 'play'}
									type='button'
									onClick={() => pauseSounds()}
									className='bg-[#ff3e3e] hover:bg-[#ff6b6b] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center px-4 py-1 text-sm rounded-md'
								>
									{isPlaying ? (
										<Pause className='mr-2' size={16} />
									) : (
										<Play className='mr-2' size={16} />
									)}
									<p className='hidden xxs:inline'>{isPlaying ? 'PAUSE' : 'PLAY'}</p>
								</button>
								<button
									title={masterMuted ? 'mute' : 'unmute'}
									type='button'
									onClick={() => muteSounds()}
									className='border-4 h-full border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center px-4 py-1 text-sm rounded-md'
								>
									{masterMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}{' '}
								</button>
								<input
									type='range'
									min={0}
									max={100}
									step={1}
									onChange={(value) => setMasterVolume(Number(value.target.value) / 100)}
									className='w-full col-span-2 xs:col-span-1 progress'
								/>
							</div>
						</div>
						<SoundPositioner
							sounds={activeSounds}
							soundEdit={howlSounds}
							setSound={setActiveSounds}
							// onPositionChange={handlePositionChange}
							// onVolumeChange={handleVolumeChange}
							// onRemoveSound={handleRemoveSound}
							// masterVolume={masterVolume}
							// masterMuted={masterMuted}
						/>
					</BrutalismCard>
				</div>
			</div>
			<BrutalismCard className='mt-6 max-w-7xl mx-auto'>
				<h2 className='text-2xl font-bold mb-4'>ACTIVE SOUNDS</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{activeSounds.map((sound) => (
						<ActiveCard
							key={sound.id}
							sound={sound}
							soundEdit={howlSounds[sound.id]}
							setSound={setActiveSounds}
						/>
					))}
					{activeSounds.length === 0 && (
						<p className='text-gray-500 col-span-full text-center py-4'>
							No active sounds. Add sounds from the library.
						</p>
					)}
				</div>
			</BrutalismCard>
		</div>
	)
}
