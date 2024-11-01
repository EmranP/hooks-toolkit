import { useEffect, useRef } from 'react'

export const useOutside = <T extends HTMLElement>(
	onOutsideClick: () => void
) => {
	const ref = useRef<T | null>(null)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick()
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [onOutsideClick])

	return ref
}
