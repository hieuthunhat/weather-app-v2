import { Box, Card, Collapse, Divider, ListItem, ListItemButton, Stack, Typography } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { formatUnixWithTZ, WeatherIcon } from '../../helpers/helpers.jsx';
import { getWeatherText } from '../../consts/weatherHelpTexts';

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
                <Stack width={'100%'}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} padding={2} gap={2} width={'100%'} flexWrap={'wrap'}>
                        <Stack alignItems={'center'} justifyContent={'center'}>
                            <Typography>{formatUnixWithTZ(data.date)}</Typography>
                        </Stack>
                        <Stack flexDirection={'row'} alignItems={'center'} gap={2} width={200}>
                            <WeatherIcon weatherCode={data.weatherCode} size={50} />
                            <Typography>{getWeatherText(data.weatherCode)}</Typography>
                        </Stack>
                        <Stack alignItems={'center'} justifyContent={'center'} width={60}>
                            <Typography>{data.precipitationSum} %</Typography>
                        </Stack>
                        <Stack flexDirection={'row'} gap={1} alignItems={'center'} justifyContent={'center'} width={100}>
                            <Typography fontWeight={'bold'}>{data.temperature_2m_max}</Typography>
                            /
                            <Typography>{data.temperature_2m_min}</Typography>
                        </Stack>
                    </Stack>
                    <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                        <Card>
                            Alo
                        </Card>
                    </Collapse>
                    <Divider />
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export default DailyUnit