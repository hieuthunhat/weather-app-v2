import React, {useContext, useEffect, useState} from 'react';
import {Box, Card, Typography, Stack, Container, Icon, Button, Divider} from "@mui/material";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import {buildForecastURL, WeatherIcon} from "../../helpers/helpers.jsx";
import {FORECAST_URL} from "../../consts/settingConstants.js";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.jsx';
import './CurrentWeatherCard.scss'
import {getWeatherText} from '../../consts/weatherHelpTexts.js';
import UnitCard from '../UnitCard/UnitCard.jsx';
import ThreeDotsButton from "../ThreeDotsButton/ThreeDotsButton.jsx";

/**
 *
 * @returns
 */
function CurrentWeatherCard() {
    const {location: selectedLocation, selectedFields, data, setData} = useContext(SettingContext);
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

    const actionsList = [
        {
            name: "Dismiss",

        }, {
            name: "Pin"
        }
    ]

    return (
        loading ?
            <LoadingSpinner/>
            :
            <Card>
                <Box padding={1}>
                    <Stack justifyContent={'flex-end'} flexDirection={'row'} paddingBlockStart={'0.5rem'}>
                        <ThreeDotsButton actions={actionsList} />
                    </Stack>
                    <Stack direction={{xs: 'column', sm: 'row'}} justifyContent={'space-between'} paddingBlock={'1rem'}
                           alignItems={'center'} gap={'1.5rem'}>
                        {/* Current weather */}
                        <Box display={'flex'} flexDirection={'column'} alignItems={'center'} width={'70%'}>
                            <Stack alignItems={'flex-start'}>
                                <Box>
                                    <Typography fontWeight={'bold'}
                                                fontSize={'xx-large'}>{selectedLocation.name}
                                    </Typography>
                                    <Typography>{selectedLocation.locationName}</Typography>
                                </Box>
                                <Stack direction="row" flexWrap={'wrap'} spacing={2} justifyContent={'center'}>
                                    <WeatherIcon
                                        weatherCode={data?.current?.weather_code}
                                        is_day={data?.current?.is_day}
                                        size={100}
                                    />
                                    <Box>
                                        <Typography
                                            fontSize={'xxx-large'} noWrap>
                                            {data?.current?.temperature_2m} {data?.current_units?.temperature_2m}
                                        </Typography>
                                        <Typography variant="body2">
                                            {getWeatherText(data?.current?.weather_code)}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>

                        <Divider/>

                        {/* Elements */}
                        <Stack width={'100%'} gap={2}>
                            <iframe
                                width="100%"
                                height="300"
                                style={{border: 0}}
                                loading="lazy"
                                allowFullScreen
                                src={`https://www.google.com/maps?q=${selectedLocation.latitude},${selectedLocation.longitude}&z=15&output=embed`}
                            />

                            <Stack gap={'1.5rem'} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}
                                   justifyContent={'space-evenly'} alignItems={'center'}>

                                <UnitCard
                                    label="Feels like"
                                    dataNumber={data?.current?.apparent_temperature}
                                    unit={data?.current_units?.temperature_2m}
                                    unitKey="FEELS_LIKE_TEMPERATURE"
                                />

                                <UnitCard
                                    label="Wind speed"
                                    dataNumber={data?.current?.wind_speed_10m}
                                    unit={data?.current_units?.wind_speed_10m}
                                    unitKey="WIND_SPEED"
                                />

                                <UnitCard
                                    label="Humidity"
                                    dataNumber={data?.current?.relative_humidity_2m}
                                    unit={data?.current_units?.relative_humidity_2m}
                                    unitKey="RELATIVE_HUMIDITY"
                                />
                                <UnitCard
                                    label="Cloud cover"
                                    dataNumber={data?.current?.cloud_cover}
                                    unit={data?.current_units?.cloud_cover}
                                    unitKey="CLOUD_COVER"
                                />
                                <UnitCard
                                    label="Wind direction"
                                    dataNumber={data?.current?.wind_direction_10m}
                                    unit={data?.current_units?.wind_direction_10m}
                                    unitKey="WIND_DIRECTION"
                                />
                                <UnitCard
                                    label="Wind gusts"
                                    dataNumber={data?.current?.wind_gusts_10m}
                                    unit={data?.current_units?.wind_gusts_10m}
                                    unitKey="WIND_GUSTS"
                                />
                            </Stack>
                        </Stack>
                    </Stack>
                </Box>
            </Card>

    );
}

export default CurrentWeatherCard;