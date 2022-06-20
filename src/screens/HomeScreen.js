import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNum, increase } from '../redux/exampleSlice'

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	let count = useSelector(getNum)
	console.log(count)
	// const [count, setCount] = useState(0)
	// const increaseHere = () => {
	// 	setCount(count + 1)
	// }
	// const decreaseHere = () => {
	// 	setCount(count - 1)
	// }

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Home Screen</Text>
			<Text>{`Times Clicked: ${count}`}</Text>
			<Button title='Page Two' onPress={() => dispatch(increase())}></Button>
		</View>
	)
}
export default HomeScreen
