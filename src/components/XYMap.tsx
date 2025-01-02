import Draggable from 'react-draggable'

type positions = {
	x: number
	y: number
}

type XYMapProps = {
	onPositionChange: (position: { x: number; y: number }) => void
	containerWidth: number
	containerHeight: number
}

export const XYMap: React.FC<XYMapProps> = ({
	onPositionChange,
	containerWidth,
	containerHeight,
}): React.ReactNode => {
	const handleDrag = (_: any, data: positions) => {
		const x = data.x - containerWidth / 2
		const y = -(data.y - containerHeight / 2)

		onPositionChange({ x, y })
	}

	return (
		<div
			style={{
				position: 'relative',
				width: containerWidth,
				height: containerHeight,
				background: '#f0f0f0',
				border: '1px solid #ccc',
				margin: 'auto',
			}}
		>
			<Draggable
				bounds={{
					left: 0,
					top: 0,
					right: containerWidth,
					bottom: containerHeight,
				}}
				defaultPosition={{ x: containerWidth / 2, y: containerHeight / 2 }}
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
