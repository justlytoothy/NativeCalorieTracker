import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrease, getNum, increase } from '../redux/exampleSlice'
import { Button } from '@rneui/base'
import MyHeader from '../general/Header'

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch()
	const count = useSelector(getNum)
	const centerComponent = <Text>Calorie Tracker</Text>

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<MyHeader navigation={navigation} page='Calorie Tracker'></MyHeader>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-evenly',
					flexDirection: 'column',
				}}>
				<Text>{`Times Clicked: ${count}`}</Text>
				<Button title='Decrease' onPress={() => dispatch(decrease())}></Button>
				<Button title='Increase' onPress={() => dispatch(increase())}></Button>
				<Button
					title='Page Two'
					onPress={() => navigation.navigate('PageTwo')}></Button>
			</View>
		</View>
	)
}

export default HomeScreen
