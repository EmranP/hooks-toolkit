import { FC } from 'react'
import { useHover } from '../../hooks/EffectStyle/Hover/useHover'

export const Hover: FC = () => {
	const { ref: hoverRef, isHovering } = useHover<HTMLDivElement>()

	return (
		<div ref={hoverRef} className={isHovering ? 'hover__active' : 'hover'}>
			<button onClick={() => console.log(hoverRef)}>Click me</button>
		</div>
	)
}
