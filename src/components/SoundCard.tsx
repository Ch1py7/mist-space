import { useEffect, useRef, useState } from 'react'
import { SoundPosition } from './SoundPositionSide'
import { SoundSide } from './SoundSide'

type SoundPositionerProps = {
	sound: Howl
	audioUrl: string
}

export const SoundPositioner: React.FC<SoundPositionerProps> = ({
	sound,
	audioUrl,
}): React.ReactElement => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const containerRef = useRef<HTMLDivElement | null>(null)
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
	const [isPlaying, setIsPlaying] = useState<boolean>(false)

	useEffect(() => {
		if (containerRef.current) {
			const { width, height } = containerRef.current.getBoundingClientRect()
			setDimensions({ width, height })
		}
	}, [])

	return (
		<div className="relative">
			<button
				type="button"
				className={`w-10 h-10 p-2 ${isEditing ? 'i-carbon-close top-1 right-1' : 'i-carbon-settings top-2 right-2'}  absolute z-20 hover:text-red transition-colors`}
				onClick={() => setIsEditing((prev) => !prev)}
			/>
			<SoundPosition
				containerRef={containerRef}
				dimensions={dimensions}
				isEditing={isEditing}
				isPlaying={isPlaying}
				setIsPlaying={setIsPlaying}
				sound={sound}
			/>
			<SoundSide
				audioUrl={audioUrl}
				isEditing={isEditing}
				isPlaying={isPlaying}
				sound={sound}
				width={dimensions.width}
			/>
		</div>
	)
}
