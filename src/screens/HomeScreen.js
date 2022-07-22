import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrease, getNum, increase } from '../redux/exampleSlice';
import { getAllData } from '../storage/storageSlice';
import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import MyHeader from '../general/Header';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const count = useSelector(getNum);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<MyHeader navigation={navigation} page='Dashboard'></MyHeader>
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
					<Text style={{ fontSize: 30, fontWeight: 'bold' }}>
						Today's Calories
					</Text>
				</View>
				<View
					style={{
						alignItems: 'center',
						width: '100%',
						flex: 1,
						justifyContent: 'center',
						flexDirection: 'column',
					}}>
					<Text style={{ fontSize: 70, fontWeight: 'bold' }}>
						763{/* Grab later */}
					</Text>
				</View>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						width: '100%',
						justifyContent: 'space-evenly',
						flexDirection: 'row',
					}}>
					<Button
						title='Add Foods'
						onPress={() =>
							navigation.navigate('FoodSearch')
						}></Button>
					<Button
						title='See Daily Summary'
						onPress={() => dispatch(increase())}></Button>
				</View>
			</View>
		</View>
	);
};

export default HomeScreen;
