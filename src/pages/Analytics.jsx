import React, {useContext, useEffect} from 'react';
import {useSelector} from "react-redux";
import {SettingContext} from "../contexts/SettingContext.jsx";
import {useFetch} from "../hooks/useFetch.js";
import {buildForecastURL} from "../helpers/helpers.jsx";
import {FORECAST_URL} from "../consts/settingConstants.js";
import {Container, Stack} from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
import HourlyWeatherCard from "../components/HourlyWeatherCard/HourlyWeatherCard.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";

function Analytics() {
    const selectedLocation = useSelector(state => state.weather.location);
    const {selectedFields, setSelectedFields} = useContext(SettingContext);
    // setSelectedFields({...selectedFields, current: []})

    const {data: weatherData, loading, fetchApi} = useFetch({
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
        <Container>
            <Stack justifyContent={'center'} gap={2}>
                {selectedLocation ?
                    loading ? <LoadingSpinner/> :
                        <>
                            {weatherData && <HourlyWeatherCard data={weatherData}/>}
                        </>
                    :
                    <EmptyState/>
                }
            </Stack>
        </Container>
    );
}

export default Analytics;