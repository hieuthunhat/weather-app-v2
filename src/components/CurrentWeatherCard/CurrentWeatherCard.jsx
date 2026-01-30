import React, {useContext, useEffect, useState} from 'react';
import {Card} from "@mui/material";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import {buildForecastURL} from "../../helpers/helpers.js";
import {FORECAST_URL} from "../../consts/settingConstants.js";

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

    // Current: location, temp,
    return (
        <Card>
            {selectedLocation.name}
            {selectedLocation.locationName}
        </Card>
    );
}

export default CurrentWeatherCard;