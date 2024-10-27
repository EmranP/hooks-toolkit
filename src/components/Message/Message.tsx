import { useState } from 'react'
import { useTimeout } from '../../hooks/Timeout/useTimeout'

export const Message = () => {
	const [message, setMessage] = useState('Ожидание...')
	const { set, clear } = useTimeout(() => setMessage('Время вышло!'), 5000)

	return (
		<div>
			<p>{message}</p>
			<button
				onClick={() => {
					setMessage('Loader....')
					set()
				}}
			>
				Перезапустить таймер
			</button>
			<button
				onClick={() => {
					setMessage('Clear timeout')
					clear()
				}}
			>
				Остановить таймер
			</button>
		</div>
	)
}
