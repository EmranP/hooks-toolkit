import { useState } from 'react'
import { useOutside } from '../../hooks/Outside/useOutside'

export const Burger = () => {
	const [isOpen, setIsOpen] = useState(false)
	const openRef = useOutside<HTMLDivElement>(() => setIsOpen(false))
	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Show me</button>
			{isOpen && (
				<div
					ref={openRef}
					style={{ border: '1px solid black', padding: '10px', margin: '10px' }}
				>
					Кликните вне этого меню, чтобы закрыть
				</div>
			)}
		</div>
	)
}
