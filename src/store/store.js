import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from '../counters/counterSlice.js'

export default configureStore({
    reducer: {
        weather: weatherReducer
    }
})