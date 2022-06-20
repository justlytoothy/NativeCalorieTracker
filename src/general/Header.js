import { Header, Icon } from '@rneui/base'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableOpacity } from 'react-native-gesture-handler'

const MyHeader = (props) => (
	<Header
		ViewComponent={LinearGradient} // Don't forget this!
		linearGradientProps={{
			colors: ['red', 'pink'],
			start: { x: 0, y: 0.5 },
			end: { x: 1, y: 0.5 },
		}}
		containerStyle={{
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#397af8',
			marginBottom: 20,
			width: '100%',
		}}
		leftComponent={
			<TouchableOpacity onPress={() => props.navigation.navigate('PageTwo')}>
				<Icon size={30} color='white' name='menu'></Icon>
			</TouchableOpacity>
		}
		centerComponent={{
			text: props.page,
			style: {
				color: 'white',
				fontSize: 17,
				fontWeight: 'bold',
			},
		}}
		rightComponent={
			<TouchableOpacity onPress={() => props.navigation.navigate('Dashboard')}>
				<Icon size={30} color='white' name='home'></Icon>
			</TouchableOpacity>
		}
	/>
)
export default MyHeader
