import { useCallback, useEffect, useState } from 'react'
import { XYMap } from './XYMap'

type positions = {
	x: number
	y: number
	z: number
}

type SoundPositionerProps = {
	containerRef: React.RefObject<HTMLDivElement>
	dimensions: { width: number; height: number }
	isPlaying: boolean
	setIsPlaying: (isPlaying: boolean) => void
	isEditing: boolean
	sound: Howl
}

export const SoundPosition: React.FC<SoundPositionerProps> = ({
	containerRef,
	dimensions,
	isPlaying,
	setIsPlaying,
	isEditing,
	sound,
}): React.ReactNode => {
	const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })

	const handlePositionChange = useCallback((newPosition: Omit<positions, 'z'>) => {
		setPosition((prev) => ({ ...prev, ...newPosition }))
	}, [])

	const handleZChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const z = Number.parseFloat(e.target.value)
		setPosition((prev) => ({ ...prev, z }))
	}, [])

	useEffect(() => {
		sound.pos(position.x / 150, position.y / 150, position.z)

		sound.on('stop', () => {
			setIsPlaying(false)
		})

		sound.on('play', () => {
			setIsPlaying(true)
		})
	}, [position, sound, setIsPlaying])

	return (
		<div
			className={`absolute top-0 left-0 w-full h-full flex items-center justify-center transition-border duration-200 flex-col z-0 p-8 border-4 ${isPlaying ? 'border-yellow-400' : 'border-white'} border-solid hover:border-teal-400 transition-all bg-white/5 gap-3 ${!isEditing ? 'invisible' : ''}`}
		>
			<div ref={containerRef} className="w-full h-full">
				{dimensions.width && dimensions.height && (
					<XYMap
						onPositionChange={handlePositionChange}
						containerWidth={dimensions.width}
						containerHeight={dimensions.height}
					/>
				)}
			</div>
			<div className="w-full">
				<label className="block text-white/80">
					POSITION Z
					<input
						type="range"
						className="w-full accent-teal-400"
						min="-5"
						max="5"
						step="0.1"
						value={position.z}
						onChange={handleZChange}
					/>
				</label>
			</div>
			<div className="border-t-2 border-white/20 pt-4 border-t-solid w-full">
				<p className="text-white/80 mb-2">CURRENT POSITION</p>
				<div className="flex justify-evenly text-sm">
					<p className="text-red">X: {(position.x / (dimensions.width / 2)).toFixed(2)}</p>
					<p className="text-green">Y: {(position.y / (dimensions.height / 2)).toFixed(2)}</p>
					<p className="text-blue">Z: {position.z.toFixed(2)}</p>
				</div>
			</div>
		</div>
	)
}
