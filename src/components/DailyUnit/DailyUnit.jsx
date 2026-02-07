import { Box, ListItem, Stack, Typography } from '@mui/material'
import React from 'react'

/**
 * Date, Min, Max
 * Dropdown
 * @param {*} param0 
 * @returns 
 */
const DailyUnit = ({ data, id }) => {
    return (
        <ListItem key={id}>
            <Stack flexDirection={'row'} justifyContent={'space-between'} padding={2}>
                <Typography>{data.date}</Typography>
                <Typography>{data.weatherCode}</Typography>
                <Typography>{data.precipitationSum}</Typography>
                <Stack flexDirection={'row'}>
                    <Typography>{data.temperature_2m_max}</Typography>
                    <Typography>{data.temperature_2m_min}</Typography>
                </Stack>
            </Stack>
        </ListItem>
    )
}

export default DailyUnit