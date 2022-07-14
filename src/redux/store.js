import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './exampleSlice.js'
import storageReducer from '../storage/storageSlice.js'
import foodReducer from '../food/foodSlice.js'

const store = configureStore({
	reducer: {
		example: exampleReducer,
		storage: storageReducer,
		food: foodReducer,
	},
})
export default store
