interface BrutalismCardProps {
	children: React.ReactNode
	className?: string
}

export const BrutalismCard: React.FC<BrutalismCardProps> = ({
	children,
	className = '',
}): React.ReactNode => {
	return (
		<div className={`bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 ${className}`}>
			{children}
		</div>
	)
}
