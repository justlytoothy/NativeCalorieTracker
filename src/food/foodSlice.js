import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
	status: 'none',
	refresh: 0,
	foods: '',
	selectedFood: '',
	selectedNutrition: '',
}
export const getAllData = createAsyncThunk('food/all', async () => {
	let headers = {
		'x-app-id': '13fa6609',
		'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
		'x-remote-user-id': '0',
	}
	try {
		const response = await axios.get(
			'https://trackapi.nutritionix.com/v2/search/instant?query={}',
			{ headers: headers }
		)
		return response.data
	} catch (error) {
		console.log('error called here', error)
		throw error
	}
})
export const getNutritionFacts = createAsyncThunk(
	'food/nutrition',
	async (arg, { getState }) => {
		try {
			const state = getState()
			if (state.food.selectedFood.hasOwnProperty('nix_item_id')) {
				let headers = {
					'x-app-id': '13fa6609',
					'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
					'Content-Type': 'application/json',
				}
				let params = state.food.selectedFood.nix_item_id
				let response = await axios.get(
					`https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${params}`,
					{ headers: headers }
				)
				console.log(response.data)
				return response.data
			} else {
				let headers = {
					'x-app-id': '13fa6609',
					'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
				}
				let params = state.food.selectedFood.food_name
				let response = await axios.post(
					`https://trackapi.nutritionix.com/v2/natural/nutrients?query=${params}`,
					{ headers: headers }
				)
				console.log(response.data)
				return response.data
			}
		} catch (error) {
			console.log('error called here', error)
			throw error
		}
	}
)

const foodSlice = createSlice({
	name: 'food',
	initialState,
	reducers: {
		setSelectedFood: (state, action) => {
			state.selectedFood = action.payload
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllData.pending, (state, action) => {
				state.status = 'loading'
				state.refresh++
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.status = 'success'
				state.refresh++
				console.log(action.payload)
				state.foods = action.payload
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
				state.refresh++
			})
			.addCase(getNutritionFacts.pending, (state, action) => {
				state.status = 'loading'
				state.refresh++
			})
			.addCase(getNutritionFacts.fulfilled, (state, action) => {
				state.status = 'success'
				state.refresh++
				state.selectedNutrition = action.payload
			})
			.addCase(getNutritionFacts.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
				state.refresh++
			})
	},
})
export const getFoods = (state) => state.food.foods
export const getSelectedFood = (state) => state.food.selectedFood
export const getSelectedNutrition = (state) => state.food.selectedNutrition
export const { setSelectedFood } = foodSlice.actions
export default foodSlice.reducer
