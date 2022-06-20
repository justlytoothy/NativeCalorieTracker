import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import Navigation from './src/navigation/Navigation.js'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import store from './src/redux/store.js'
export default function App() {
	return (
		<SafeAreaProvider>
			<Provider store={store}>
				<Navigation></Navigation>
			</Provider>
		</SafeAreaProvider>
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
