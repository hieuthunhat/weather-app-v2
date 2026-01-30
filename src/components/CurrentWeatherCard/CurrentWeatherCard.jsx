import React, {useContext, useEffect, useState} from 'react';
import {Card, Typography} from "@mui/material";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import {buildForecastURL} from "../../helpers/helpers.js";
import {CELSIUS, FAHRENHEIT, FORECAST_URL} from "../../consts/settingConstants.js";

function CurrentWeatherCard() {
    const {location: selectedLocation, selectedFields} = useContext(SettingContext);
    const [data, setData] = useState({})
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

    const unitBuilder = selectedFields.temperature_unit.length > 0 ? CELSIUS : FAHRENHEIT

    // Current: location, temp,
    return (
        <Card>
            <Typography fontWeight={'bold'} fontSize={'xx-large'}>{selectedLocation.name}</Typography>
            <Typography>{selectedLocation.locationName}</Typography>
        </Card>
    );
}

export default CurrentWeatherCard;