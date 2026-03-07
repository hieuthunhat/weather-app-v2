import {Card, List, MenuItem, Select, Stack, Typography} from '@mui/material'
import React, {useMemo, useState} from 'react'
import DailyUnit from "../DailyUnit/DailyUnit.jsx";
import {FORECAST_DAYS_OPTIONS} from "../../consts/settingConstants.js";

const DailyWeatherCard = ({data}) => {
    const daily = data?.daily;
    const dailyUnits = data?.daily_units;
    const [forecastDays, setForecastDays] = useState(FORECAST_DAYS_OPTIONS[0]);

    const allForecastData = useMemo(() => daily?.time?.map((date, index) => ({
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
    })) ?? [], [daily, dailyUnits]);

    const displayedForecastData = useMemo(
        () => allForecastData.slice(0, forecastDays.value),
        [allForecastData, forecastDays.value]
    );

    return (
        <Card>
            <Stack padding={1}>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography fontWeight={'bold'} fontSize={'x-large'}>
                        {forecastDays.label} forecast
                    </Typography>
                    <Select
                        size="small"
                        value={forecastDays.value}
                        onChange={(e) => setForecastDays(FORECAST_DAYS_OPTIONS.find(opt => opt.value === e.target.value))}
                        sx={{fontSize: 14}}
                    >
                        {FORECAST_DAYS_OPTIONS.map(opt => (
                            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                        ))}
                    </Select>
                </Stack>
                <List>
                    {displayedForecastData.map((forecast, index) => (
                        <DailyUnit key={index} data={forecast} index={index}/>
                    ))}
                </List>
            </Stack>
        </Card>
    )
}

export default DailyWeatherCard