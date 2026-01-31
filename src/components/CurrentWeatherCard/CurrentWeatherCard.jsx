import React, { useContext, useEffect, useState } from 'react';
import { Box, Card, Typography, Stack, Container } from "@mui/material";
import { SettingContext } from "../../contexts/SettingContext.jsx";
import { buildForecastURL } from "../../helpers/helpers.js";
import { FORECAST_URL } from "../../consts/settingConstants.js";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import { getWeatherIcon } from '../../consts/iconMaps.js';
import './CurrentWeatherCard.scss'
import { getWeatherText } from '../../consts/weatherHelpTexts.js';
import UnitCard from '../UnitCard/UnitCard.jsx';

function CurrentWeatherCard() {
    const { location: selectedLocation, selectedFields, data, setData } = useContext(SettingContext);
    const [loading, setLoading] = useState(false)
    const fetchCurrentWeather = async () => {
        setLoading(true)
        try {
            const response = await fetch(buildForecastURL({
                url: FORECAST_URL,
                obj: selectedFields,
                latitude: selectedLocation.latitude,
                longitude: selectedLocation.longitude
            }));

            const json = await response.json();
            setData(json);


        } catch (e) {
            console.error(e)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!selectedLocation) {
            return;
        }
        fetchCurrentWeather();
    }, [selectedLocation])

    function WeatherIcon({ weatherCode, is_day, size = 48 }) {
        const Icon = getWeatherIcon(weatherCode, is_day);
        const color = getWeatherColor(weatherCode, is_day);
        return (
            <Icon
                size={size}
                color={color}
                className={`weather-icon ${getIconClass(weatherCode)}`}
            />
        );

    }


    return (
        <Card>
            {loading ?
                <LoadingSpinner />
                :
                data &&
                <Container>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent={'space-between'}>
                        {/* Current weather */}
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
                            <Typography fontWeight={'bold'} fontSize={'xx-large'}>{selectedLocation.name}</Typography>
                            <Typography>{selectedLocation.locationName}</Typography>
                            <Stack direction="row" spacing={2}>
                                <WeatherIcon
                                    weatherCode={data.current?.weather_code}
                                    is_day={data.current?.is_day}
                                    size={100}
                                />
                                <Box>
                                    <Typography>{data.current?.temperature_2m} {data.current_units?.temperature_2m}</Typography>
                                    <Typography variant="body2">
                                        {getWeatherText(data.current?.weather_code)}
                                    </Typography>

                                    <Typography>Humidity: {data.current?.relative_humidity_2m} {data.current_units?.relative_humidity_2m}</Typography>
                                </Box>
                            </Stack>
                        </Box>

                        {/* Elements */}
                        <Box>
                            <UnitCard label={'Feel like'} dataNumber={data.current?.apparent_temperature} unit={data.current_units?.temperature_2m} />
                        </Box>
                    </Stack>
                </Container>
            }
        </Card>
    );
}

function getIconClass(weatherCode) {
    if (weatherCode === 0) return "sun";
    if ([61, 63, 65, 80, 81, 82].includes(weatherCode)) return "rain";
    if ([71, 73, 75, 85, 86].includes(weatherCode)) return "snow";
    if ([95, 96, 99].includes(weatherCode)) return "thunder";
    return "";
}

function getWeatherColor(weatherCode, isDay) {
    if (weatherCode === 0) return isDay ? "#FDB813" : "#4A6FA5";

    if ([1, 2, 3].includes(weatherCode)) return "#90A4AE";

    if ([45, 48].includes(weatherCode)) return "#B0BEC5";

    if (
        [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)
    ) return "#4FC3F7";

    if ([71, 73, 75, 77, 85, 86].includes(weatherCode))
        return "#E1F5FE";

    if ([95, 96, 99].includes(weatherCode))
        return "#9575CD";

    return "#90A4AE";
}



export default CurrentWeatherCard;