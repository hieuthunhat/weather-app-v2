import {Box, Card, Collapse, Divider, Grid, ListItem, ListItemButton, Stack, Typography} from '@mui/material'
import React, {useCallback, useState} from 'react'
import {formatUnixWithTZ, WeatherIcon} from '../../helpers/helpers.jsx';
import {getWeatherText} from '../../consts/weatherHelpTexts';
import {
    WiRain,
    WiShowers,
    WiSnow,
    WiUmbrella,
} from "react-icons/wi";
import DetailDailyCard from "../DetailDailyCard/DetailDailyCard.jsx";


/**
 * Date, Min, Max
 * Dropdown
 * @param {*} param0
 * @returns
 */
const DailyWeatherCard = ({data, id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toogleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])

    return (
        <ListItem key={id} sx={{backgroundColor: 'rgba(0, 0, 0, 0.02)', '&hover': 'rgba(255, 255, 255, 0.08)'}}>
            <ListItemButton onClick={toogleOpen}>
                <Stack width={'100%'}>
                    <Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                        wrap="wrap"
                    >
                        <Grid item size={3}>
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <Typography>
                                    {formatUnixWithTZ({unix: data.date, allowHours: true})}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item size={3}>
                            <Box display="flex" alignItems="center" gap={2}>
                                <WeatherIcon weatherCode={data.weatherCode} size={50}/>
                                <Typography>{getWeatherText(data.weatherCode)}</Typography>
                            </Box>
                        </Grid>

                        <Grid item size={2}>
                            <Box
                                display="flex"
                                gap={1}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Typography fontWeight="bold">
                                    {data.temperature_2m} {data.hourly_units?.temperature_2m}
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item size={2}>
                            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
                                <WiUmbrella size={50}/>
                                <Typography>{data.precipitation} %</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                        <Card>
                            <DetailDailyCard
                                precipitationSum={data.precipitation}
                                showers={data.showers}
                                rain={data.rain}
                                snowFall={data.snowfall}
                                windDirection={data.windDirection}
                            />
                        </Card>
                    </Collapse>
                    <Divider/>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export default DailyWeatherCard