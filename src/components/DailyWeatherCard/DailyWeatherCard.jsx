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
import DailyUnit from "../DailyUnit/DailyUnit.jsx";


/**
 * Date, Min, Max
 * Dropdown
 * @param {*} param0
 * @returns
 */
const DailyWeatherCard = ({data}) => {
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
        precipitationProbability: daily?.precipitation_probability_max?.[index],
        rainSum: daily.rain_sum?.[index],
        showersSum: daily.showers_sum?.[index],
        snowfallSum: daily.snowfall_sum?.[index],
        uvIndex: daily.uv_index_max?.[index],
        windDirection: daily.wind_direction_10m_dominant?.[index],
        windSpeed: daily.wind_speed_10m_max?.[index],
        daily_units: dailyUnits
    }));

    console.log(dailyForecastData)

    return (
        <Card>
            <Stack padding={1}>
                <Typography fontWeight={'bold'}
                            fontSize={'x-large'}>7 days forecast
                </Typography>
                <List>
                    {dailyForecastData?.map((forecast, index) =>
                        (
                            <DailyUnit data={forecast} index={index}/>
                        )
                    )}
                </List>
            </Stack>
        </Card>
    )
}

export default DailyWeatherCard