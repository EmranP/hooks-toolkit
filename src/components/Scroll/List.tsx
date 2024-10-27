import { useCallback, useRef, useState } from 'react'
import { useScroll } from '../../hooks/EffectStyle/Scroll/useScroll'

export interface FetchTodo {
	id: number
	title: string
}

export const List = () => {
	const [todos, setTodos] = useState<FetchTodo[]>([])
	const [page, setPage] = useState<number>(1)
	const limit = 20
	const parentRef = useRef<HTMLDivElement>(null)
	const childRef = useRef<HTMLDivElement>(null)

	const fetchTodo = useCallback(
		async (page: number, limit: number): Promise<void> => {
			try {
				const response = await fetch(
					`https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
				)
				if (!response.ok) {
					throw new Error('Error fetching data')
				}

				const data: FetchTodo[] = await response.json()
				setTodos(prev => [
					...prev,
					...data.filter(newTodo => !prev.some(todo => newTodo.id === todo.id)),
				])
				setPage(prev => prev + 1)
			} catch (error) {
				console.error(error)
			}
		},
		[]
	)

	useScroll(parentRef, childRef, () => fetchTodo(page, limit))

	return (
		<div ref={parentRef} style={{ height: '80vh', overflow: 'auto' }}>
			{todos.map(todo => (
				<div key={todo.id} style={{ padding: 30, border: '1px solid red' }}>
					{todo.id} .{todo.title}
				</div>
			))}
			<div ref={childRef} style={{ height: 20, background: 'green' }}></div>
		</div>
	)
}
