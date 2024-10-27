import axios from 'axios'
import { useRequest } from '../../hooks/Fetch/useRequest'

interface FetchTask {
	id: number
	title: string
}

export const Task = () => {
	// useRequest
	const fetchData = async () => {
		const response = await axios.get<FetchTask[]>(
			`https://jsonplaceholder.typicode.com/todos`
		)
		return response.data
	}

	const [todos, loading, error] = useRequest(fetchData)

	if (loading) {
		return <h1>Loading....</h1>
	}

	if (error) {
		return <h1>Error</h1>
	}

	return (
		<div>
			{todos &&
				todos.map(todo => (
					<div key={todo.id} style={{ padding: 30, border: '1px solid red' }}>
						{todo.id} .{todo.title}
					</div>
				))}
		</div>
	)
}
