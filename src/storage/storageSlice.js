import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import storage from './dataStorage.js'

const initialState = {
	count: 0,
	status: 'none',
	refresh: 0,
}
export const getAllData = createAsyncThunk('storage/all', async (data) => {
	try {
		const response = await storage.getData('all')
		return response.data
	} catch (error) {
		console.log(error)
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
				return action.payload
			})
			.addCase(getAllData.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
				state.refresh++
			})
	},
})
export const getNum = (state) => state.example.count
export const { increase, decrease, clear } = storageSlice.actions
export default storageSlice.reducer
