import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData } from '../storage/storageSlice';
import { getSelectedFood, getNutritionFacts } from '../food/foodSlice';
import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import MyHeader from '../general/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';

const FoodDetails = (props) => {
	const dispatch = useDispatch();
	const [facts, setFacts] = useState(null);
	useEffect(() => {
		getFacts(props.food);
	}, [props.food]);
	const getFacts = async (food) => {
		try {
			if (food.hasOwnProperty('nix_item_id')) {
				let headers = {
					'x-app-id': '13fa6609',
					'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
					'Content-Type': 'application/json',
				};
				let params = food.nix_item_id;
				let response = await axios.get(
					`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${params}`,
					{ headers: headers }
				);
				setFacts(response.data);
			} else {
				let headers = {
					'x-app-id': '13fa6609',
					'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
				};
				let params = food.food_name;
				let response = await axios.post(
					`https://trackapi.nutritionix.com/v2/natural/nutrients?query=${params}`,
					{ headers: headers }
				);
				setFacts(response.data);
			}
		} catch (error) {
			console.log('error called here', error);
		}
	};
	if (facts !== null) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
				}}>
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
							{props.food.food_name}
						</Text>
					</View>
				</View>
			</View>
		);
	} else {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexDirection: 'column',
				}}>
				<MyHeader
					navigation={props.navigation}
					page='Calorie Tracker'></MyHeader>
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
						<Text
							style={{
								fontSize: 25,
								fontWeight: 'bold',
							}}>
							{props.food.food_name}
						</Text>
						{/*implement loading spinner here later */}
					</View>
				</View>
			</View>
		);
	}
};

export default FoodDetails;
