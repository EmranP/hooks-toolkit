import { useEffect, useRef } from 'react'

// Определим типы событий для всех возможных элементов
type EventMap = WindowEventMap & DocumentEventMap & HTMLElementEventMap
type EventHandler<K extends keyof EventMap> = (event: EventMap[K]) => void

export const useEventListener = <K extends keyof EventMap>(
	eventName: K,
	handler: EventHandler<K>,
	element: Window | Document | HTMLElement | null = window
) => {
	const savedHandler = useRef<EventHandler<K> | null>(null)

	// Обновляем сохраненный обработчик, если он изменился
	useEffect(() => {
		savedHandler.current = handler
	}, [handler])

	useEffect(() => {
		// Проверка существования элемента
		if (!element) return

		// Создаем типизированный обработчик для события
		const eventListener = (event: Event) => {
			if (savedHandler.current) {
				savedHandler.current(event as EventMap[K])
			}
		}

		element.addEventListener(eventName, eventListener as EventListener)
		return () => {
			element.removeEventListener(eventName, eventListener as EventListener)
		}
	}, [eventName, element])
}
