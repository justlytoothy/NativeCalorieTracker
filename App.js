import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Navigation from './src/navigation/Navigation.js'
import { Provider } from 'react-redux'
import store from './src/redux/store.js'
export default function App() {
	return (
		<Provider store={store}>
			<Navigation></Navigation>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
