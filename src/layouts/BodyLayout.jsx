import {Container, Stack} from '@mui/material'
import React, {useContext, useEffect, useState} from 'react'
import {useSelector} from "react-redux";
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import {SettingContext} from '../contexts/SettingContext.jsx';
import EmptyState from '../components/EmptyState/EmptyState.jsx';
import DailyWeatherCard from '../components/DailyWeatherCard/DailyWeatherCard.jsx';
import {buildForecastURL} from "../helpers/helpers.jsx";
import {FORECAST_URL} from "../consts/settingConstants.js";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner.jsx";

const BodyLayout = () => {
    const selectedLocation = useSelector(state => state.weather.location);
    const {selectedFields, data, setData} = useContext(SettingContext);
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
    return (
        <Container>
            <Stack justifyContent={'center'} gap={2}>
                {selectedLocation ?
                    loading ? <LoadingSpinner /> :
                        <>
                            <CurrentWeatherCard/>
                            {data && <DailyWeatherCard data={data}/>}
                        </>
                    :
                    <EmptyState/>
                }
            </Stack>
        </Container>
    )
}

export default BodyLayout