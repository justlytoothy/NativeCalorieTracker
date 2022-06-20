import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import routes from './routes'
import { LinearGradient } from 'expo-linear-gradient'

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

// const Navigation = () => {
// 	return (
// 		<NavigationContainer>
// 			<Stack.Navigator>
// 				{routes.map((route, index) => {
// 					return (
// 						<Stack.Screen
// 							key={index}
// 							name={route.name}
// 							component={route.component}
// 							options={{ headerShown: false }}
// 						/>
// 					)
// 				})}
// 			</Stack.Navigator>
// 		</NavigationContainer>
// 	)
// }
const Navigation = () => {
	return (
		<NavigationContainer>
			<Drawer.Navigator screenOptions={{}}>
				{routes.map((route, index) => {
					return (
						<Drawer.Screen
							key={index}
							name={route.name}
							component={route.component}
							options={{ headerShown: false, drawerLabel: route.title }}
						/>
					)
				})}
			</Drawer.Navigator>
		</NavigationContainer>
	)
}
export default Navigation
{
	/* <LinearGradient
colors={['red', 'pink']}
start={{ x: 0, y: 0.5 }}
end={{ x: 1, y: 0.5 }}> */
}
