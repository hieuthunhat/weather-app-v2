import React, {useContext, useEffect} from 'react';
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import {useSelector} from "react-redux";
import {Grid, Stack} from "@mui/material";
import HomePageSkeleton from "../components/Skeletons/HomePageSkeleton.jsx";
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import {SettingContext} from "../contexts/SettingContext.jsx";
import {useFetch} from "../hooks/useFetch.js";
import {buildForecastURL} from "../helpers/helpers.jsx";
import {FORECAST_URL} from "../consts/settingConstants.js";
import DailyWeatherCard from "../components/DailyWeatherCard/DailyWeatherCard.jsx";
import ForecastHourlyCard from "../components/ForecastHourlyCard/ForecastHourlyCard.jsx";
import Onboarding from "../components/Onboarding/Onboarding.jsx";

/**
 *
 * @returns {Element}
 * @constructor
 */
function Home() {
    const selectedLocation = useSelector(state => state.weather.location);
    const {selectedFields, onboardingDone, completeOnboarding, componentVisibility, unitSettings} = useContext(SettingContext);
    const {home: homeVis} = componentVisibility;

    const {data: weatherData, loading, fetchApi} = useFetch({
        url: null,
        initLoad: false
    })

    useEffect(() => {
        if (!selectedLocation) {
            return;
        }
        const freshUrl = buildForecastURL({
            url: FORECAST_URL,
            obj: selectedFields,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            units: unitSettings
        });
        fetchApi(freshUrl);
    }, [selectedLocation, unitSettings])

    const handleOnboardingClose = () => {
        completeOnboarding();
    };

    return (
        <Stack justifyContent={'center'} gap={2} padding={2} maxWidth={2000} alignItems={'center'}
               width={'100%'}
               margin={'0 auto'}>
            {!onboardingDone ?
                <Onboarding onClose={handleOnboardingClose}/>
                :
                selectedLocation ?
                    loading ? <HomePageSkeleton/> :
                        <Grid container spacing={2} columns={16}>
                            <Grid size={{xs: 16, md: 10}}>
                                <Stack spacing={2}>
                                    <CurrentWeatherCard data={weatherData}/>
                                    {homeVis.forecastHourlyCard && <ForecastHourlyCard data={weatherData}/>}
                                </Stack>
                            </Grid>
                            {homeVis.dailyWeatherCard && (
                                <Grid size={{xs: 16, md: 'grow'}}>
                                    <DailyWeatherCard data={weatherData}/>
                                </Grid>
                            )}
                        </Grid>
                    :
                    <EmptyState/>
            }
        </Stack>
    )
}

export default Home;