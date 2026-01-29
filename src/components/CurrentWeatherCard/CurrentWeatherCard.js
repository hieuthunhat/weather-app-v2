import React, {useContext} from 'react';
import {Card} from "@mui/material";
import {SettingContext} from "../../contexts/SettingContext.jsx";

function CurrentWeatherCard() {
    const {location: selectedLocation} = useContext(SettingContext);
    return (
        <Card>

        </Card>
    );
}

export default CurrentWeatherCard;