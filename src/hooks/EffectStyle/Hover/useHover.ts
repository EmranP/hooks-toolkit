import { RefObject, useEffect, useRef, useState } from 'react'

type UseHoverReturn<T> = {
	ref: RefObject<T>
	isHovering: boolean
}

export const useHover = <T extends HTMLElement>(
	externalRef?: RefObject<T>
): UseHoverReturn<T> => {
	const [isHovering, setIsHovering] = useState(false)
	const internalRef = useRef<T>(null)
	const ref = externalRef || internalRef

	const on = () => setIsHovering(true)
	const off = () => setIsHovering(false)

	useEffect(() => {
		const node = ref.current
		if (!node) return

		node.addEventListener('mouseenter', on)
		node.addEventListener('mousemove', on)
		node.addEventListener('mouseleave', off)

		return () => {
			node.removeEventListener('mouseenter', on)
			node.removeEventListener('mousemove', on)
			node.removeEventListener('mouseleave', off)
		}
	}, [ref])

	return { ref, isHovering }
}
