import { useState } from 'react'
import { useThrottle } from '../../hooks/Throttle/useThrottle'

export const Throttle = () => {
	const [count, setCount] = useState(0)

	const throttleIncrement = useThrottle(() => {
		setCount(prev => prev + 1)
	}, 500)
	return (
		<div>
			<div>Count: {count}</div>
			<button onClick={throttleIncrement}>Увеличить с задержкой</button>
		</div>
	)
}
