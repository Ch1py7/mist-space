import type { ActiveSounds } from '@/App'
import { X } from 'lucide-react'

interface ActiveCardProps {
	sound: ActiveSounds
	soundEdit: Howl
	setSound: React.Dispatch<React.SetStateAction<ActiveSounds[]>>
}

export const ActiveCard: React.FC<ActiveCardProps> = ({
	sound,
	soundEdit,
	setSound,
}): React.ReactNode => {
	const removeSound = (id: string) => {
		setSound((prev) => {
			const indexToRemove = prev.findIndex((p) => p.id === id)
			soundEdit.stop()
			delete prev[indexToRemove]
			return prev.filter((p) => p !== null)
		})
	}

	return (
		<div
			key={sound.id}
			className='p-4 border-4 border-black flex items-center justify-between relative'
			style={{ backgroundColor: sound.color }}
		>
			<button
				type='button'
				className='absolute top-0 right-0 p-2 cursor-pointer'
				onClick={() => removeSound(sound.id)}
			>
				<X size={16} />
			</button>
			<div className='flex gap-4'>
				<div className='min-w-12 flex items-center justify-center bg-white border-2 border-black rounded-full'>
					{sound.icon}
				</div>
				<div className='flex flex-col min-w-full'>
					<span className='font-bold'>{sound.name}</span>
					<input
						type='range'
						min={0}
						max={100}
						step={1}
						value={sound.volume * 100}
						className='w-full'
						onChange={(e) => {
							const volume = Number.parseFloat(e.target.value) / 100
							soundEdit.volume(volume)
							setSound((prev) => prev.map((p) => (p.id === sound.id ? { ...p, volume } : p)))
						}}
					/>
				</div>
			</div>
		</div>
	)
}
