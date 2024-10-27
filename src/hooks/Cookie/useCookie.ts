import { useState } from 'react'

export const useCookie = (key: string, defaultValue?: string) => {
	const [value, setValue] = useState<string | undefined>(() => {
		const cookie = document.cookie
			.split('; ')
			.find(row => row.startsWith(`${key}=`))
		return cookie ? decodeURIComponent(cookie.split('=')[1]) : defaultValue
	})

	const updateCookie = (newValue: string, options: { days?: number } = {}) => {
		const { days = 7 } = options
		const expires = new Date()
		expires.setDate(expires.getDate() + days)
		document.cookie = `${key}=${encodeURIComponent(
			newValue
		)}; expires=${expires.toUTCString()}; path=/`
		setValue(newValue)
	}

	const deleteCookie = () => {
		document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
		setValue(undefined)
	}

	return [value, updateCookie, deleteCookie] as const
}
