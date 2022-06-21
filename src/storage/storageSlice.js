import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import storage from './dataStorage.js'
import axios from 'axios'

const headers = {
	'x-app-id': '13fa6609',
	'x-app-key': 'e4a724b80fefba02cae5199bed3e7538',
	'x-remote-user-id': '0',
}
const initialState = {
	count: 0,
	status: 'none',
	refresh: 0,
	foods: '',
}
export const getAllData = createAsyncThunk('storage/all', async () => {
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

const storageSlice = createSlice({
	name: 'storage',
	initialState,
	reducers: {
		increase: (state) => {
			state.count++
		},
		decrease: (state) => {
			state.count--
		},
		clear: (state) => {
			state.count = 0
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
	},
})
export const getFoods = (state) => state.storage.foods
export const getNum = (state) => state.storage.count
export const { increase, decrease, clear } = storageSlice.actions
export default storageSlice.reducer
