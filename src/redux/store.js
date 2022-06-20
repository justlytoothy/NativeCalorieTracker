import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './exampleSlice.js'
import storageReducer from '../storage/storageSlice.js'

const store = configureStore({
	reducer: {
		example: exampleReducer,
		storage: storageReducer,
	},
})
export default store
