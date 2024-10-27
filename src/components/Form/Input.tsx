import { FC } from 'react'
import { useInput } from '../../hooks/Form/useInput'

export const Input: FC = () => {
	const userName = useInput('')
	const userPassword = useInput('')
	const userAge = useInput(0)

	const viewResult = () => {
		console.log(
			`name: ${userName.value}, password: ${userPassword.value}, age: ${userAge.value}`
		)
	}

	return (
		<div>
			<input type='text' placeholder='userName' {...userName} />
			<input type='password' placeholder='password' {...userPassword} />
			<input type='number' placeholder='age' {...userAge} />
			<button onClick={viewResult}>Result</button>
		</div>
	)
}
