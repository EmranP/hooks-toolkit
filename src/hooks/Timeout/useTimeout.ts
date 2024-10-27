import { useCallback, useEffect, useRef } from 'react'

export const useTimeout = (callback: () => void, delay: number) => {
	const timeoutRef = useRef<number | undefined>()
	const callbackRef = useRef(callback)

	useEffect(() => {
		callbackRef.current = callback
	}, [callback])

	const set = useCallback(() => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)
		timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay)
	}, [delay])

	const clear = useCallback(() => {
		if (timeoutRef.current !== undefined) {
			clearTimeout(timeoutRef.current)
			timeoutRef.current = undefined
		}
	}, [])

	// Удалим автоматический запуск таймера, чтобы запуск был только при вызове `set`
	useEffect(() => {
		return clear
	}, [clear])

	return { set, clear }
}
