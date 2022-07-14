import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedFood, getSelectedFood } from '../food/foodSlice'
import { Button } from '@rneui/base'
import { Input } from '@rneui/themed'
import MyHeader from '../general/Header'
import axios from 'axios'
import AddFood from './AddFood'

const PageTwo = ({ navigation }) => {
	const dispatch = useDispatch()
	const selectedFood = useSelector(getSelectedFood)
	const [results, setResults] = useState([''])
	const [food, setFood] = useState('')
	const [search, setSearch] = useState('')
	const inputRef = React.createRef()
	let searchString = ''
	const headers = {
		'x-app-id': '13fa6609',
		'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
		'x-remote-user-id': '0',
	}
	useEffect(() => {
		autoSearch()
	}, [search])
	const autoSearch = async () => {
		if (search !== '') {
			try {
				let response = await axios.get(
					`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
					{ headers: headers }
				)
				setResults(response.data)
			} catch (error) {
				console.log(error)
			}
		}
	}
	const selectFood = (newFood) => {
		console.log(newFood)
		setFood(newFood)
		dispatch(setSelectedFood(newFood))
		console.log(selectedFood)
	}
	if (food === '') {
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
						width: '100%',
						justifyContent: 'space-evenly',
						flexDirection: 'column',
					}}>
					<View style={{ width: '80%' }}>
						<Input
							ref={inputRef}
							placeholder='Enter Food Here'
							rightIcon={{ type: 'font-awesome', name: 'search' }}
							onChangeText={(text) => setSearch(text)}></Input>
					</View>
					<View>
						<Text>Branded Foods</Text>
						<FlatList
							data={results.branded}
							renderItem={({ item, index, separators }) => (
								<TouchableHighlight
									key={item.food_name}
									onShowUnderlay={separators.highlight}
									onHideUnderlay={separators.unhighlight}
									onPress={() => selectFood(item)}>
									<View
										style={{
											backgroundColor: 'white',
											borderWidth: 2,
											borderColor: 'black',
											paddingVertical: 5,
											flex: 1,
											justifyContent: 'space-evenly',
										}}>
										<Image
											style={{
												width: 25,
												height: 25,
											}}
											source={{
												uri: item.photo.thumb,
											}}
										/>
										<Text>{`${item.food_name}`}</Text>
									</View>
								</TouchableHighlight>
							)}
							keyExtractor={(item) => item.food_name}
						/>
						{/* <Text>Common Foods</Text>
						<FlatList
							data={results.common}
							renderItem={({ item, index, separators }) => (
								<TouchableHighlight
									key={item.food_name}
									onShowUnderlay={separators.highlight}
									onHideUnderlay={separators.unhighlight}
									onPress={() => selectFood(item)}>
									<View
										style={{
											backgroundColor: 'white',
											borderWidth: 2,
											borderColor: 'black',
											paddingVertical: 5,
											flex: 1,
											justifyContent: 'space-evenly',
										}}>
										<Image
											style={{
												width: 25,
												height: 25,
											}}
											source={{
												uri: item.photo.thumb,
											}}
										/>
										<Text>{`${item.food_name}`}</Text>
									</View>
								</TouchableHighlight>
							)}
							keyExtractor={(item) => item.food_name}
						/> */}
					</View>
				</View>
			</View>
		)
	} else {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
				}}>
				<AddFood navigation={navigation}></AddFood>
			</View>
		)
	}
}

export default PageTwo
