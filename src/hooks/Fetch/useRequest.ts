import { useEffect, useState } from 'react'

type UseRequestReturn<T> = [T | null, boolean, string | null]

export const useRequest = <T>(
	request: () => Promise<T>
): UseRequestReturn<T> => {
	const [data, setData] = useState<T | null>(null)
	const [loading, setLading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>('')

	useEffect(() => {
		setLading(true)
		const fetchData = async () => {
			try {
				const response = await request()
				setData(response)
			} catch (error) {
				setError((error as Error).message || 'Error fetching data')
			} finally {
				setLading(false)
			}
		}

		fetchData()
	}, [])

	return [data, loading, error]
}
