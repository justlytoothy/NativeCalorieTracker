import { StyleSheet, Text, View } from 'react-native'
import MyHeader from '../general/Header.js'
function PageTwo({ navigation }) {
	return (
		<View
			style={{
				flex: 1,
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'flex-start',
			}}>
			<MyHeader page='Page Two' navigation={navigation}></MyHeader>
			<Text>Page Two</Text>
		</View>
	)
}

export default PageTwo
