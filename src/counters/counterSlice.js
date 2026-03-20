import { createSlice } from '@reduxjs/toolkit'
import {parseCookie} from "../hooks/useCookie.js";

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        location: parseCookie('lastSearch') ?? null,
        data: null,
    },
    reducers: {
        setLocationData: (state, action) => {
            state.location = action.payload
        },
        setWeatherData: (state, action) => {
            state.data = action.payload
        },
    }
})

export const { setLocationData, setWeatherData } = weatherSlice.actions

export default weatherSlice.reducer