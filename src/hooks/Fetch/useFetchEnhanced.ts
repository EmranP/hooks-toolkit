import { useEffect, useState } from 'react'

export const useFetchEnhanced = <T>(url: string, options?: RequestInit) => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	useEffect(() => {
		const controller = new AbortController()
		const fetchData = async () => {
			setLoading(true)
			try {
				const response = await fetch(url, {
					...options,
					signal: controller.signal,
				})
				if (!response.ok) throw new Error('Ошибка при загрузке данных')
				const result = await response.json()
				setData(result)
			} catch (err) {
				if ((err as Error).name !== 'AbortError') setError(err as Error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
		return () => controller.abort()
	}, [url, options])

	return { data, loading, error }
}
