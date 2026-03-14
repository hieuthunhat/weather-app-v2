import React, {useCallback, useState} from 'react';
import {Box, Card, Collapse, Divider, Grid, ListItem, ListItemButton, Stack, Typography} from "@mui/material";
import {formatUnixWithTZ, WeatherIcon} from "../../helpers/helpers.jsx";
import {getWeatherText} from "../../consts/weatherHelpTexts.js";
import DetailDailyCard from "../DetailDailyCard/DetailDailyCard.jsx";

/**
 *
 * @param data
 * @param index
 * @returns {React.JSX.Element}
 * @constructor
 */
function DailyUnit({data, index}) {
    const [isOpen, setIsOpen] = useState(false);
    const toogleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])
    return (
        <ListItem
            key={index}
            sx={{
                backgroundColor: index % 2 === 0 ? 'action.hover' : 'transparent',
                borderRadius: 2,
                mb: 0.5,
                transition: 'background-color 0.2s',
                '&:hover': {
                    backgroundColor: 'action.selected',
                },
            }}>
            <ListItemButton onClick={toogleOpen} sx={{borderRadius: 2}}>
                <Stack width={'100%'}>
                    <Stack width={'100%'} paddingBlock={1}>
                        <Grid
                            container
                            spacing={2}
                            alignItems="center"
                            justifyContent="space-between"
                            wrap="wrap"
                        >
                            <Grid
                                item
                                size={2}>
                                <Box
                                    display="flex"
                                    justifyContent="start"
                                    alignItems="start">
                                    <Typography color="text.secondary" fontWeight={500}>
                                        {formatUnixWithTZ({unix: data.date})}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item size={5}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <WeatherIcon weatherCode={data.weatherCode} size={50}/>
                                    <Typography color="text.primary">{getWeatherText(data.weatherCode)}</Typography>
                                </Box>
                            </Grid>

                            <Grid item size={3}>
                                <Stack
                                    flexDirection="row"
                                    gap={1}
                                    alignItems="center"
                                    justifyContent="start"
                                >
                                    <Stack flexDirection={'row'} flexWrap={'wrap'} gap={1}>
                                        <Typography fontWeight="bold" color="primary.main">
                                            {data?.temperature_2m_min}
                                        </Typography>
                                        <Typography color="text.secondary">/</Typography>
                                        <Typography fontWeight="bold" color="secondary.main">
                                            {data?.temperature_2m_max}
                                        </Typography>
                                    </Stack>
                                    <Typography fontWeight="bold" color="text.secondary">{data?.daily_units?.temperature_2m_min}</Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                            <Card sx={{mt: 1, bgcolor: 'action.hover', borderRadius: 2}}>
                                <DetailDailyCard
                                    time={formatUnixWithTZ({unix: data.date, format: 'DD-MM-YYYY'})}
                                    precipitation={data.precipitationSum}
                                    showers={data.showersSum}
                                    rain={data.rainSum}
                                    snowFall={data.snowfallSum}
                                    windDirection={data.windDirection}
                                    windSpeed={data.windSpeed}
                                    sunRise={data.sunrise}
                                    sunSet={data.sunset}
                                    uvIndex={data.uvIndex}
                                    precipitationProbability={data.precipitationProbability}
                                    units={data.daily_units}
                                />
                            </Card>
                        </Collapse>
                    </Stack>
                    <Divider/>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export default DailyUnit;