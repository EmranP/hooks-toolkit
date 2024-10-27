import { ChangeEvent, useState } from 'react'
import { FetchTodo } from '../Scroll/List'
import { useDebounce } from '../../hooks/Debounce/useDebounce'

export const Search = () => {
	const [value, setValue] = useState<string>('')

	const searchHandler = async (query: string) => {
		if (!query) return

		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/todos?query=` + query
			)
			if (!response.ok) {
				throw new Error('Error fetching data')
			}

			const data: FetchTodo[] = await response.json()
			return console.log(data)
		} catch (error) {
			console.error(error)
		}
	}

	const debouncedSearch = useDebounce(searchHandler, 500)

	const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
		debouncedSearch(e.target.value)
	}
	return (
		<div>
			<input type='text' value={value} onChange={onChangeSearch} />
		</div>
	)
}
