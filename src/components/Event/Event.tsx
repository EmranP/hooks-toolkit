import { useRef, useState } from 'react'
import { useEventListener } from '../../hooks/EventListener/useEventListener'

export const Event = () => {
	const [scrollY, setScrollY] = useState(0)
	const [countClicks, setCountClicks] = useState(0)
	const buttonRef = useRef<HTMLButtonElement | null>(null)

	useEventListener('scroll', () => setScrollY(window.scrollY))
	useEventListener(
		'click',
		() => setCountClicks(prev => prev + 1),
		buttonRef.current
	)

	return (
		<div>
			<h2>Прокрутка по Y: {scrollY}px</h2>
			<h2>Clicks: {countClicks}</h2>
			<button ref={buttonRef}>Нажми меня</button>
		</div>
	)
}
