import { RefObject, useCallback, useEffect, useRef } from 'react'

type UseScrollOptions = {
	root?: HTMLElement | null
	rootMargin?: string
	threshold?: number
}

export const useScroll = (
	parentRef: RefObject<HTMLElement>,
	childRef: RefObject<HTMLElement>,
	callback: () => void,
	options: UseScrollOptions = { rootMargin: '0px', threshold: 0 }
) => {
	const observer = useRef<IntersectionObserver | null>(null)

	const intersectHandle = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [entry] = entries
			if (entry.isIntersecting) callback()
		},
		[callback]
	)

	useEffect(() => {
		if (!parentRef.current || !childRef.current) return

		observer.current = new IntersectionObserver(intersectHandle, {
			root: parentRef.current,
			rootMargin: options.rootMargin,
			threshold: options.threshold,
		})

		observer.current.observe(childRef.current)

		return () => observer.current?.disconnect()
	}, [
		callback,
		options.rootMargin,
		options.threshold,
		parentRef,
		childRef,
		intersectHandle,
	])
}
