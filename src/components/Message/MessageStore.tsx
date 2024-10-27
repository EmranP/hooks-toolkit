import { ChangeEvent, useState } from 'react'
import { useLocalStorageEnhanced } from '../../hooks/LocalStorage/useLocalStorageEnhanced'

export const MessageStore = () => {
	const [name, setName, clearStorageName, clearStorage] =
		useLocalStorageEnhanced('name', 'user')
	const [pass, setPass] = useLocalStorageEnhanced('password', 'userPassword')
	const [count, setCount, clearStorageCount] = useLocalStorageEnhanced(
		'count',
		0
	)
	const [value, setValue] = useState<string>('')
	const [valuePass, setValuePass] = useState<string>('')

	const clearStorageHandler = () => {
		clearStorage()
	}
	return (
		<div>
			<h1>hello, {name}</h1>
			<h2>your secret {pass}</h2>
			<h1>{count}</h1>
			<button onClick={() => setCount(prev => prev + 1)}>add count</button>
			<input
				type='text'
				value={value}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setValue(e.target.value)
				}
			/>
			<input
				type='password'
				value={valuePass}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setValuePass(e.target.value)
				}
			/>
			<button onClick={() => setName(value)}>set to Storage name</button>
			<button onClick={() => setPass(valuePass)}>
				set to Storage password
			</button>
			<button onClick={clearStorageHandler}>Clear</button>
			<button
				onClick={() => {
					clearStorageName()
					setValue('')
				}}
			>
				Clear item name
			</button>
			<button
				onClick={() => {
					clearStorageCount()
				}}
			>
				Clear item count
			</button>
		</div>
	)
}
