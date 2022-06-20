import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import routes from './routes'

const Stack = createNativeStackNavigator()

const Navigation = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				{routes.map((route, index) => {
					return (
						<Stack.Screen
							key={index}
							name={route.name}
							component={route.component}
							options={{ headerShown: false }}
						/>
					)
				})}
			</Stack.Navigator>
		</NavigationContainer>
	)
}
export default Navigation
