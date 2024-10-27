import { useCookie } from '../../hooks/Cookie/useCookie'

export const Server = () => {
	const [cookieValue, setCookieValue, deleteCookie] = useCookie('user', 'Guest')

	return (
		<div>
			<p>Куки: {cookieValue}</p>
			<button onClick={() => setCookieValue('Rustem')}>Установить куки</button>
			<button onClick={deleteCookie}>Удалить куки</button>
		</div>
	)
}
