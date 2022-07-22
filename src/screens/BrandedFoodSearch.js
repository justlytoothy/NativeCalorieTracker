import {
	View,
	Text,
	FlatList,
	TouchableHighlight,
	Image,
	Modal,
	StyleSheet,
	Pressable,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFood, getSelectedFood } from '../food/foodSlice';
import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import MyHeader from '../general/Header';
import axios from 'axios';
import FoodDetails from './FoodDetails';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const BrandedFoodSearch = ({ navigation }) => {
	const dispatch = useDispatch();
	const selectedFood = useSelector(getSelectedFood);
	const [results, setResults] = useState(['']);
	const [food, setFood] = useState('');
	const [search, setSearch] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const inputRef = React.createRef();
	const headers = {
		'x-app-id': '13fa6609',
		'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
		'x-remote-user-id': '0',
	};
	useEffect(() => {
		autoSearch();
	}, [search]);
	const tabBarHeight = useBottomTabBarHeight();

	const autoSearch = async () => {
		if (search !== '') {
			try {
				let response = await axios.get(
					`https://trackapi.nutritionix.com/v2/search/instant?query=${search}`,
					{ headers: headers }
				);
				setResults(response.data);
			} catch (error) {
				console.log(error);
			}
		}
	};
	const selectFood = (newFood) => {
		setFood(newFood);
		setModalVisible(true);
	};
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'flex-start',
				flexDirection: 'column',
			}}>
			<Modal
				animationType='none'
				presentationStyle={'overFullScreen'}
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<FoodDetails
							navigation={navigation}
							food={food}></FoodDetails>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}>
							<Text style={styles.textStyle}>Hide Modal</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
			<MyHeader
				navigation={navigation}
				page='Brand Name Foods'></MyHeader>

			<View
				style={{
					flex: 1,
					alignItems: 'center',
					width: '100%',
					justifyContent: 'flex-start',
					flexDirection: 'column',
				}}>
				<View style={{ width: '90%' }}>
					<Input
						ref={inputRef}
						placeholder='Enter Food Here'
						rightIcon={{ type: 'font-awesome', name: 'search' }}
						onChangeText={(text) => setSearch(text)}></Input>
				</View>
				<View style={{ width: '100%', paddingBottom: tabBarHeight }}>
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
										paddingHorizontal: 5,
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
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: '#F194FF',
	},
	buttonClose: {
		backgroundColor: '#2196F3',
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default BrandedFoodSearch;
