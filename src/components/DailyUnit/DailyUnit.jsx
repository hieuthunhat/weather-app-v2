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
            sx={
                {
                    backgroundColor: 'rgba(0, 0, 0, 0.02)', '&hover':
                        'rgba(255, 255, 255, 0.08)'
                }
            }>
            <
                ListItemButton
                onClick={toogleOpen}>
                < Stack
                    width={'100%'}>
                    < Grid
                        container
                        spacing={2}
                        alignItems="center"
                        justifyContent="space-between"
                        wrap="wrap"
                    >
                        < Grid
                            item
                            size={3}>
                            <Box
                                display="flex"
                                justifyContent="start"
                                alignItems="start">
                                <Typography>
                                    {formatUnixWithTZ({unix: data.date})}
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
                                <Typography>{data.precipitationSum} %</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                        <Card>
                            <DetailDailyCard
                                precipitationSum={data.precipitationSum}
                                showers={data.showersSum}
                                rain={data.rainSum}
                                snowFall={data.snowfallSum}
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

export default DailyUnit;