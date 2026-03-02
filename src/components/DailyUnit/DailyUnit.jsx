import React, {useCallback, useState} from 'react';
import {Box, Card, Collapse, Divider, Grid, ListItem, ListItemButton, Stack, Typography} from "@mui/material";
import {formatUnixWithTZ, WeatherIcon} from "../../helpers/helpers.jsx";
import {getWeatherText} from "../../consts/weatherHelpTexts.js";
import {WiUmbrella} from "react-icons/wi";
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
            sx={{backgroundColor: 'action.hover'}}>
            <ListItemButton onClick={toogleOpen}>
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
                                    <Typography>
                                        {formatUnixWithTZ({unix: data.date})}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item size={5}>
                                <Box display="flex" alignItems="center" gap={2}>
                                    <WeatherIcon weatherCode={data.weatherCode} size={50}/>
                                    <Typography>{getWeatherText(data.weatherCode)}</Typography>
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
                                        <Typography fontWeight="bold">
                                            {data?.temperature_2m_min}
                                        </Typography>
                                        /
                                        <Typography fontWeight="bold">
                                            {data?.temperature_2m_max}
                                        </Typography>
                                    </Stack>
                                    <Typography fontWeight="bold">{data?.daily_units?.temperature_2m_min}</Typography>
                                </Stack>
                            </Grid>

                            {/*<Grid item size={3}>*/}
                            {/*    <Stack justifyContent="start" flexDirection={'row'} flexWrap={'wrap'} alignItems="center" gap={1}>*/}
                            {/*        <WiUmbrella size={50}/>*/}
                            {/*        <Typography>{data.precipitationProbability} %</Typography>*/}
                            {/*    </Stack>*/}
                            {/*</Grid>*/}
                        </Grid>
                        <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                            <Card>
                                <DetailDailyCard
                                    time={formatUnixWithTZ({unix: data.date, format: 'DD-MM-YYYY'})}
                                    precipitation={data.precipitationSum}
                                    showers={data.showersSum}
                                    rain={data.rainSum}
                                    snowFall={data.snowfallSum}
                                    windDirection={data.windDirection}
                                    sunRise={data.sunrise}
                                    sunSet={data.sunset}
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