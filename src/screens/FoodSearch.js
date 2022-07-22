import { View, Text, FlatList, TouchableHighlight, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedFood, getSelectedFood } from '../food/foodSlice';
import { Button } from '@rneui/base';
import { Input } from '@rneui/themed';
import MyHeader from '../general/Header';
import axios from 'axios';
import FoodDetails from './FoodDetails';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BrandedFoodSearch from './BrandedFoodSearch.js';
import CommonFoodSearch from './CommonFoodSearch.js';
import Ionicons from '@expo/vector-icons/Ionicons';

const FoodSearch = ({ navigation }) => {
	const Tab = createBottomTabNavigator();

	return (
		// <View
		// 	style={{
		// 		flex: 1,
		// 		alignItems: 'center',
		// 		justifyContent: 'flex-start',
		// 		flexDirection: 'column',
		// 	}}>
		// 	<MyHeader navigation={navigation} page='Add Foods'></MyHeader>
		<Tab.Navigator
			screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
			<Tab.Screen name='Branded' component={BrandedFoodSearch} />
			<Tab.Screen name='Generic' component={CommonFoodSearch} />
		</Tab.Navigator>
		// </View>
	);
};

export default FoodSearch;
