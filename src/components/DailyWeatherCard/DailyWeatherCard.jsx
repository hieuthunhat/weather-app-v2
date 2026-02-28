import {Box, Card, Collapse, Divider, Grid, List, ListItem, ListItemButton, Stack, Typography} from '@mui/material'
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
    const daily = data?.daily;
    const dailyUnits = data?.daily_units;

    const dailyForecastData = daily?.time?.map((date, index) => ({
        date,
        weatherCode: daily.weather_code?.[index],
        temperature_2m_max: daily.temperature_2m_max?.[index],
        temperature_2m_min: daily.temperature_2m_min?.[index],
        sunrise: daily.sunrise?.[index],
        sunset: daily.sunset?.[index],
        precipitationSum: daily.precipitation_sum?.[index],
        rainSum: daily.rain_sum?.[index],
        showersSum: daily.showers_sum?.[index],
        snowfallSum: daily.snowfall_sum?.[index],
        uvIndex: daily.uv_index_max?.[index],
        windDirection: daily.wind_direction_10m_dominant?.[index],
        windSpeed: daily.wind_speed_10m_max?.[index],
        daily_units: dailyUnits,
    }));

    console.log(dailyForecastData)

    return (
        <Card>
            <List>
                {dailyForecastData?.map((forecast, index) =>
                    (
                        <ListItem key={index}
                                  sx={{backgroundColor: 'rgba(0, 0, 0, 0.02)', '&hover': 'rgba(255, 255, 255, 0.08)'}}>
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
                )}
            </List>
        </Card>
    )
}

export default DailyWeatherCard