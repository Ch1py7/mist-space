import type { ActiveSounds } from '@/App'
import { Volume2 } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface SoundPositioner {
	sounds: ActiveSounds[]
	soundEdit: Record<string, Howl>
	setSound: React.Dispatch<React.SetStateAction<ActiveSounds[]>>
}

export const SoundPositioner: React.FC<SoundPositioner> = ({
	sounds,
	setSound,
	soundEdit,
}): React.ReactNode => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [activeDrag, setActiveDrag] = useState<string | null>(null)

	const handleMouseDown = (e: React.MouseEvent, id: string) => {
		e.preventDefault()
		e.stopPropagation()
		setActiveDrag(id)
	}

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!activeDrag || !containerRef.current) return

		const rect = containerRef.current.getBoundingClientRect()
		const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
		const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))

		const positionX = +(2 * (x / 100) - 1).toFixed(2)
		const positionY = +(2 * (y / 100) - 1).toFixed(2)

		setSound((prev) =>
			prev.map((p) => (p.id === activeDrag ? { ...p, position: { ...p.position, x, y } } : p))
		)

		soundEdit[activeDrag].pos(positionX, positionY, 0)
	}

	const handleMouseUp = useCallback(() => {
		setActiveDrag(null)
	}, [])

	useEffect(() => {
		document.addEventListener('mouseup', handleMouseUp)
		return () => {
			document.removeEventListener('mouseup', handleMouseUp)
		}
	}, [handleMouseUp])

	return (
		<div
			ref={containerRef}
			className='relative w-full h-[400px] border-4 border-black bg-[#f0f0f0] overflow-hidden'
			onMouseMove={handleMouseMove}
		>
			<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-black rounded-full border-4 border-white z-10'>
				<div className='absolute inset-0 flex items-center justify-center text-white'>
					<Volume2 size={16} />
				</div>
			</div>

			{sounds.map((sound) => (
				<div
					key={sound.id}
					className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-move ${
						activeDrag === sound.id ? 'w-12 h-12' : 'w-10 h-10'
					}`}
					style={{
						left: `${sound.position.x}%`,
						top: `${sound.position.y}%`,
						zIndex: activeDrag === sound.id ? 20 : 10,
					}}
					onMouseDown={(e) => handleMouseDown(e, sound.id)}
				>
					<div
						className='w-full h-full rounded-full border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
						style={{ backgroundColor: sound.color }}
					>
						<div className='text-black'>{sound.icon}</div>
					</div>
				</div>
			))}
			{sounds.length === 0 && (
				<div className='absolute inset-0 flex items-center justify-center z-50'>
					<div className='bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'>
						<p className='font-bold text-center'>
							Add sounds from the library and position them here
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
