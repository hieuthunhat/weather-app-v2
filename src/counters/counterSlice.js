import { createSlice } from '@reduxjs/toolkit'

export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        location: null,
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