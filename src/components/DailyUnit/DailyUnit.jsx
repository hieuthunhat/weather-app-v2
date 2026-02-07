import { Box, Collapse, ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'

/**
 * Date, Min, Max
 * Dropdown
 * @param {*} param0 
 * @returns 
 */
const DailyUnit = ({ data, id }) => {
    const [isOpen, setIsOpen] = useState(false);
    const toogleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])

    return (
        <ListItem key={id}>
            <ListItemButton onClick={toogleOpen}>
                <Stack>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} padding={2}>
                        <Typography>{data.date}</Typography>
                        <Typography>{data.weatherCode}</Typography>
                        <Typography>{data.precipitationSum}</Typography>
                        <Stack flexDirection={'row'}>
                            <Typography>{data.temperature_2m_max}</Typography>
                            <Typography>{data.temperature_2m_min}</Typography>
                        </Stack>
                    </Stack>
                    <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                        Alo
                    </Collapse>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export default DailyUnit