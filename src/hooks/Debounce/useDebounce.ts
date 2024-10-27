import { useCallback, useRef } from 'react'

export const useDebounce = <T extends HTMLElement>(
	callback: (...args: T[]) => void,
	delay: number
) => {
	const timer = useRef<number | null>(null) // Изменяем на number
	const lastArgs = useRef<T[]>([]) // Сохраняем последние аргументы в массиве

	const debounceCallback = useCallback(
		(...args: T[]) => {
			lastArgs.current = args // Сохраняем последние аргументы

			if (timer.current) {
				clearTimeout(timer.current)
			}

			timer.current = setTimeout(() => {
				// Вызываем коллбек с последними аргументами
				callback(...lastArgs.current)
			}, delay)
		},
		[callback, delay]
	)

	return debounceCallback
}
