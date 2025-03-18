import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { type Audio, audios } from '@/lib/sounds'
import { useState } from 'react'

interface SoundLibraryProps {
	onAddSound: (sound: Audio) => void
}

const categories = [
	{ id: 'nature', name: 'NATURE' },
	{ id: 'ambient', name: 'AMBIENT' },
	{ id: 'urban', name: 'URBAN' },
	{ id: 'asmr', name: 'ASMR' },
]

export const SoundLibrary: React.FC<SoundLibraryProps> = ({ onAddSound }): React.ReactNode => {
	const [_, setActiveCategory] = useState('nature')

	return (
		<div>
			<Tabs defaultValue='nature' onValueChange={setActiveCategory}>
				<TabsList className='w-full grid grid-cols-2 sm:grid-cols-4 rounded-none border-4 border-black m-0 h-full'>
					{categories.map((category) => (
						<TabsTrigger
							key={category.id}
							value={category.id}
							className='data-[state=active]:bg-black data-[state=active]:text-white rounded-none font-bold cursor-pointer text-xs sm:text-sm'
						>
							{category.name}
						</TabsTrigger>
					))}
				</TabsList>
				{categories.map((category) => (
					<TabsContent key={category.id} value={category.id} className='mt-0'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
							{audios[category.id as keyof typeof audios].map((sound) => (
								<button
									type='button'
									key={sound.id}
									onClick={() => onAddSound(sound)}
									className='py-2 space-x-2 px-3 flex lg:flex-col xl:flex-row items-center justify-start rounded-md border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer'
									style={{ backgroundColor: sound.color }}
								>
									<div className='min-w-10 min-h-10 flex items-center justify-center bg-white border-2 border-black rounded-full'>
										{sound.icon}
									</div>
									<span className='font-bold text-black text-sm sm:text-base text-start lg:text-center xl:text-start'>{sound.name}</span>
								</button>
							))}
						</div>
					</TabsContent>
				))}
			</Tabs>
		</div>
	)
}
