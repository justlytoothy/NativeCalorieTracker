import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	count: 0,
}

const exampleSlice = createSlice({
	name: 'example',
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
})
export const getNum = (state) => state.example.count
export const { increase, decrease, clear } = exampleSlice.actions
export default exampleSlice.reducer
