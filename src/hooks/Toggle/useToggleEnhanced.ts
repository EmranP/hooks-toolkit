import { useState } from 'react'

export const useToggleEnhanced = (initialValue = false) => {
	const [value, setValue] = useState(initialValue)
	const toggle = () => setValue(prev => !prev)
	const setTrue = () => setValue(true)
	const setFalse = () => setValue(false)

	return { value, toggle, setTrue, setFalse }
}
