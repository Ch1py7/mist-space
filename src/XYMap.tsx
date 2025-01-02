import Draggable from 'react-draggable'

type positions = {
	x: number
	y: number
}

type XYMapProps = {
	onPositionChange: (position: { x: number; y: number }) => void
}

const mapSize = {
	x: 300,
	y: 300,
}

const mapCenter = {
	x: mapSize.x / 2,
	y: mapSize.y / 2,
}

export const XYMap: React.FC<XYMapProps> = ({ onPositionChange }): React.ReactNode => {
	const handleDrag = (_: any, data: positions) => {
		const x = data.x - mapCenter.x
		const y = -(data.y - mapCenter.y)

		onPositionChange({ x, y })
	}

	return (
		<div
			style={{
				position: 'relative',
				width: mapSize.x,
				height: mapSize.y,
				background: '#f0f0f0',
				border: '1px solid #ccc',
				margin: 'auto',
			}}
		>
			<Draggable
				bounds={{
					left: 0,
					top: 0,
					right: mapSize.x,
					bottom: mapSize.y,
				}}
				defaultPosition={{ x: mapCenter.x, y: mapCenter.y }}
				onDrag={handleDrag}
			>
				<div
					style={{
						width: 20,
						height: 20,
						background: 'grey',
						borderRadius: '50%',
						position: 'absolute',
						cursor: 'grab',
						left: -10,
						top: -10,
					}}
				/>
			</Draggable>
		</div>
	)
}
