import React, { useContext, useEffect } from 'react';
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import { useSelector } from "react-redux";
import { Container, Stack } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import HourlyWeatherCard from "../components/HourlyWeatherCard/HourlyWeatherCard.jsx";
import { SettingContext } from "../contexts/SettingContext.jsx";
import { useFetch } from "../hooks/useFetch.js";
import { buildForecastURL } from "../helpers/helpers.jsx";
import { FORECAST_URL } from "../consts/settingConstants.js";

function Home() {
    const selectedLocation = useSelector(state => state.weather.location);
    const { selectedFields, setSelectedFields } = useContext(SettingContext);
    // setSelectedFields({...selectedFields, current: []})

    const { data: weatherData, loading, fetchApi } = useFetch({
        url: buildForecastURL({
            url: FORECAST_URL,
            obj: selectedFields,
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude
        }),
        initLoad: false
    })

    useEffect(() => {
        if (!selectedLocation) {
            return;
        }
        fetchApi();
    }, [selectedLocation])
    return (
        <Stack justifyContent={'center'} gap={2}>
            {selectedLocation ?
                loading ? <LoadingSpinner /> :
                    <>
                        {weatherData && <CurrentWeatherCard data={weatherData} />}
                        {weatherData && <HourlyWeatherCard data={weatherData} />}
                    </>
                :
                <EmptyState />
            }
        </Stack>
    )
}

export default Home;