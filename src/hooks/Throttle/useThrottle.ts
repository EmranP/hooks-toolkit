import { useCallback, useRef } from 'react'

export const useThrottle = <T extends (...args: T[]) => void>(
	callback: T,
	delay: number
) => {
	const lastCallTime = useRef<number | null>(null)
	const savedCallback = useRef(callback)

	savedCallback.current = callback

	return useCallback(
		(...args: Parameters<T>) => {
			const now = Date.now()

			if (
				lastCallTime.current === null ||
				now - lastCallTime.current >= delay
			) {
				lastCallTime.current = now
				savedCallback.current(...args)
			}
		},
		[delay]
	)
}
