import { useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'

interface WaveformProps {
	audioUrl: string
  width: number
}

export const Waveform: React.FC<WaveformProps> = ({ audioUrl, width }) => {
	const waveformRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!waveformRef.current) return

		// Inicializa Wavesurfer en modo de solo vista
		const wavesurfer = WaveSurfer.create({
			container: waveformRef.current,
			waveColor: '#ddd',
			progressColor: '#ddd', // Mismo color para que no haya "progreso"
			cursorWidth: 0, // Desactiva el cursor
			interact: false, // Desactiva cualquier interacción
			barWidth: 2,
			height: 100,
		})

		// Carga el archivo de audio y renderiza solo la onda
		wavesurfer.load(audioUrl)

		return () => {
			wavesurfer.destroy() // Limpia la instancia
		}
	}, [audioUrl])

	return <div ref={waveformRef} style={{ width: width, height: '100px' }} />
}
