import { useWindowSize } from '../../hooks/WindowSize/useWindowSize'

export const WindowSize = () => {
	const { width, height } = useWindowSize()
	return (
		<div>
			<h2>
				Размер окна: {width} x {height}
			</h2>
		</div>
	)
}
