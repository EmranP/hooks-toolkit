import { useFetchEnhanced } from '../../hooks/Fetch/useFetchEnhanced'

interface Post {
	id: number
	title: string
	body: string
}
// useFetchEnhanced
export const TaskWithFetch = () => {
	const {
		data: posts,
		loading,
		error,
	} = useFetchEnhanced<Post[]>('https://jsonplaceholder.typicode.com/posts')

	if (loading) return <p>Загрузка...</p>
	if (error) return <p>Ошибка: {error.message}</p>

	return (
		<>
			{posts?.map(item => (
				<div key={item.id}>
					<h1>{item.title}</h1>
					<p>{item.body}</p>
				</div>
			))}
		</>
	)
}
