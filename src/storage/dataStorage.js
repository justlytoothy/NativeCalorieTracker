import AsyncStorage from '@react-native-async-storage/async-storage'

const storeData = async (value, key) => {
	try {
		await AsyncStorage.setItem(key, JSON.stringify(value))
	} catch (error) {
		console.log(error)
	}
}

const getData = async (key) => {
	try {
		if (!key === 'all') {
			let data = await AsyncStorage.getItem(key)
		} else {
			let data = await AsyncStorage.getItem(key)
		}
		return data != null ? JSON.parse(data) : null
	} catch (error) {
		console.log(error)
	}
}

const storage = {
	getData,
	storeData,
}
export default storage
