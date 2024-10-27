import { ChangeEvent, useState } from 'react'

export const useInput = (initialValue: string | number) => {
	const [value, setValue] = useState(initialValue)

	const onChange = (e: ChangeEvent<HTMLInputElement>) =>
		setValue(e.target.value)

	return { value, onChange }
}
