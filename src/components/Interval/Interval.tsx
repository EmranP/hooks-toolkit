import { useState } from 'react'
import { useInterval } from '../../hooks/Interval/useInterval'

export const Interval = () => {
	const [count, setCount] = useState(0)

	useInterval(() => setCount(prev => prev + 1), 1000)
	return (
		<div>
			<h1>{count}</h1>
		</div>
	)
}
