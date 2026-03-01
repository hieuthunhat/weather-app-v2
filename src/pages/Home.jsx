import React, {useContext, useEffect} from 'react';
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import {useSelector} from "react-redux";
import {Container, Grid, Stack} from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import {SettingContext} from "../contexts/SettingContext.jsx";
import {useFetch} from "../hooks/useFetch.js";
import {buildForecastURL} from "../helpers/helpers.jsx";
import {FORECAST_URL} from "../consts/settingConstants.js";
import DailyWeatherCard from "../components/DailyWeatherCard/DailyWeatherCard.jsx";

function Home() {
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
        <Stack justifyContent={'center'} gap={2} padding={2}>
            {selectedLocation ?
                loading ? <LoadingSpinner/> :
                    <Grid container spacing={2} columns={16}>
                        <Grid size={{ xs: 16, md: 10 }}>
                            <CurrentWeatherCard data={weatherData}/>
                        </Grid>
                        <Grid size={{ xs: 16, md: 'grow' }}>
                            <DailyWeatherCard data={weatherData}/>
                        </Grid>
                    </Grid>
                :
                <EmptyState/>
            }
        </Stack>
    )
}

export default Home;