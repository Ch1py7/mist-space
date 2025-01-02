import { useEffect, useRef, useState } from 'react'
import { Waveform } from './WaveForm'
import { XYMap } from './XYMap'

type positions = {
	x: number
	y: number
}

type SoundPositionerProps = {
	sound: Howl
	audioUrl: string
}

export const SoundPositioner: React.FC<SoundPositionerProps> = ({
	sound,
	audioUrl,
}): React.ReactElement => {
	const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })
	const [isEditing, setIsEditing] = useState(false)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

	useEffect(() => {
		sound.pos(position.x / 150, position.y / 150, position.z)
	}, [position, sound])

	const handlePositionChange = (newPosition: positions) => {
		setPosition((prev) => ({ ...prev, ...newPosition }))
	}

	const handleZChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const z = Number.parseFloat(e.target.value)
		setPosition((prev) => ({ ...prev, z }))
	}

	useEffect(() => {
		if (containerRef.current) {
			const { width, height } = containerRef.current.getBoundingClientRect()
			setDimensions({ width, height })
		}
	}, [])

	return (
		<div className="relative">
			{isEditing ? (
				<button
					type="button"
					className="w-10 h-10 p-2 i-carbon-close absolute top-1 right-1 z-20 hover:text-red transition-colors"
					onClick={() => setIsEditing(false)}
				/>
			) : (
				<button
					type="button"
					className="w-10 h-10 p-2 i-carbon-settings absolute top-2 right-2 z-20 hover:text-teal-400 transition-colors"
					onClick={() => setIsEditing(true)}
				/>
			)}
			<div
				className={`absolute top-0 left-0 w-full h-full flex items-center justify-center flex-col z-0 p-8 border-4 border-white border-solid hover:border-teal-400 transition-colors bg-white/5 gap-3 ${!isEditing && 'invisible'}`}
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

			<button
				type="button"
				className={`w-full border-4 border-white border-solid hover:border-teal-400 transition-colors bg-white/5 relative z-10 ${isEditing && 'invisible'}`}
				onClick={() => {
					if (sound.playing()) {
						sound.stop()
					} else {
						sound.play()
					}
				}}
			>
				<div className="aspect-square bg-white/5 hover:bg-white/10 p-8 flex flex-col items-center justify-center">
					<div className="flex items-center gap-2 h-24">
						<Waveform audioUrl={audioUrl} width={dimensions.width} />
					</div>
				</div>
			</button>
		</div>
	)
}
