import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllData } from '../storage/storageSlice'
import { getSelectedFood, getNutritionFacts } from '../food/foodSlice'
import { Button } from '@rneui/base'
import { Input } from '@rneui/themed'
import MyHeader from '../general/Header'
import axios from 'axios'

const AddFood = (props) => {
	const dispatch = useDispatch()
	const currentFood = useSelector(getSelectedFood)
	useEffect(() => {
		dispatch(getNutritionFacts())
	}, [])

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<MyHeader navigation={props.navigation} page='Calorie Tracker'></MyHeader>
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					width: '100%',
					justifyContent: 'flex-start',
					flexDirection: 'column',
				}}>
				<View
					style={{
						alignItems: 'center',
						width: '100%',
						height: 140,
						justifyContent: 'center',
						flexDirection: 'column',
					}}>
					<Text style={{ fontSize: 25, fontWeight: 'bold' }}>
						{currentFood.food_name}
					</Text>
				</View>
			</View>
		</View>
	)
}

export default AddFood
