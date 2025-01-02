import { Howl } from 'howler'
import { useState } from 'react'
import { XYMap } from './XYMap'

type positions = {
	x: number
	y: number
}

const defaultVolume = 0.3

const sound = new Howl({
	src: ['/sound.mp3'],
	volume: defaultVolume,
})

export const SoundPositioner: React.FC = (): React.ReactElement => {
	const [position, setPosition] = useState({ x: 0, y: 0, z: 0 })

	const handlePositionChange = (newPosition: positions) => {
		setPosition((prev) => ({ ...prev, ...newPosition }))
	}

	const handleZChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const z = Number.parseFloat(e.target.value)
		setPosition((prev) => ({ ...prev, z }))
	}

	sound.pos(position.x / 150, position.y / 150, position.z)

	return (
		<>
			<button type="button" onClick={() => sound.play()}>
				Play
			</button>
			<div style={{ padding: '20px' }}>
				<XYMap onPositionChange={handlePositionChange} />
				<div style={{ marginTop: '20px' }}>
					<label>
						Posicion Z:
						<input
							type="range"
							min="-10"
							max="10"
							step="0.1"
							value={position.z}
							onChange={handleZChange}
						/>
					</label>
				</div>
				<div style={{ marginTop: '20px' }}>
					<p>Posicion actual:</p>
					<p>X: {(position.x / 150).toFixed(2)}</p>
					<p>Y: {(position.y / 150).toFixed(2)}</p>
					<p>Z: {position.z.toFixed(2)}</p>
				</div>
			</div>
		</>
	)
}
