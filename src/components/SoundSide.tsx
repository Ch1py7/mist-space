import { Waveform } from './WaveForm'

type SoundSideProps = {
	sound: Howl
	isPlaying: boolean
	isEditing: boolean
	audioUrl: string
	width: number
}

export const SoundSide: React.FC<SoundSideProps> = ({
	sound,
	isPlaying,
	isEditing,
	audioUrl,
	width,
}): React.ReactNode => {
	return (
		<button
			type="button"
			className={`w-full border-4 ${isPlaying ? 'border-yellow-400' : 'border-[#e2cbba]'} border-solid hover:border-teal-400 transition-border duration-200 bg-[#e2cbba]/5 relative z-10 ${isEditing ? 'invisible' : ''}`}
			onClick={() => {
				if (sound.playing()) {
					sound.stop()
				} else {
					sound.play()
				}
			}}
		>
			<div className="aspect-square bg-[#e2cbba]/5 hover:bg-[#e2cbba]/10 p-8 flex flex-col items-center justify-center relative">
				<p className="text-[#e2cbba] absolute bottom-4 font-600 font-mono text-lg">
					{isPlaying ? 'p l a y i n g . . .' : ''}
				</p>
				<div className="flex items-center gap-2 h-24">
					<Waveform audioUrl={audioUrl} width={width} />
				</div>
			</div>
		</button>
	)
}
