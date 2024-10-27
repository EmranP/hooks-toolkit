import { useEffect, useState } from 'react'

export const useLocalStorageEnhanced = <T>(key: string, initialValue: T) => {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : initialValue
		} catch (error) {
			console.error('Ошибка при чтении из localStorage:', error)
			return initialValue
		}
	})

	const setValue = (value: T | ((val: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)
			localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.error('Ошибка при записи в localStorage:', error)
		}
	}

	const clearStorage = () => {
		try {
			localStorage.clear()
		} catch (error) {
			console.error('Ошибка при очистке localStorage:', error)
		}
	}

	const clearStorageItem = () => {
		try {
			setStoredValue(initialValue)
			localStorage.removeItem(key)
		} catch (error) {
			console.error('Ошибка при удалении элемента из localStorage:', error)
		}
	}

	useEffect(() => {
		const handleStorageChange = (e: StorageEvent) => {
			if (e.key === key) {
				setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue)
			}
		}
		window.addEventListener('storage', handleStorageChange)
		return () => window.removeEventListener('storage', handleStorageChange)
	}, [key, initialValue])

	return [storedValue, setValue, clearStorageItem, clearStorage] as const
}
