import { createContext, useState } from "react";
import {
    CLOUD_COVER,
    DOMINANT_WIND_DIRECTION,
    FEELS_LIKE_TEMPERATURE,
    IS_DAY,
    PRECIPITATION,
    PRECIPITATION_SUM,
    RAIN_SUM,
    RELATIVE_HUMIDITY,
    SHOWERS,
    SHOWERS_SUM,
    SNOWFALL,
    SNOWFALL_SUM,
    SUNRISE,
    SUNSET,
    TEMPERATURE,
    TEMPERATURE_MAX,
    TEMPERATURE_MIN,
    UV_INDEX_MAX,
    WEATHER_CODE,
    WIND_DIRECTION,
    WIND_GUSTS,
    WIND_GUSTS_MAX,
    WIND_SPEED,
    WIND_SPEED_MAX
} from "../consts/settingConstants.js";
import {useSelector} from "react-redux";

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const storedLocation = useSelector(state => state.weather.location);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [theme, setTheme] = useState('light');
    const [data, setData] = useState()
    const [location, setLocation] = useState(storedLocation);
    const [selectedFields, setSelectedFields] = useState({
        daily: [TEMPERATURE_MAX, TEMPERATURE_MIN, WIND_GUSTS_MAX, WIND_SPEED_MAX, SUNRISE, SUNSET, PRECIPITATION_SUM, DOMINANT_WIND_DIRECTION, UV_INDEX_MAX, WEATHER_CODE, SHOWERS_SUM, RAIN_SUM, SNOWFALL_SUM],
        current: [TEMPERATURE, WIND_SPEED, RELATIVE_HUMIDITY, WEATHER_CODE, IS_DAY, PRECIPITATION, SHOWERS, SNOWFALL, FEELS_LIKE_TEMPERATURE, WIND_DIRECTION, WIND_GUSTS, CLOUD_COVER],
        hourly: [],
        temperature_unit: []
    });
    const [hideElements, setHideElements] = useState([]);

    return <SettingContext.Provider value={{
        isOpenDrawer,
        setIsOpenDrawer,
        theme,
        setTheme,
        setLocation,
        location,
        selectedFields,
        setSelectedFields,
        data,
        setData,
        hideElements,
        setHideElements
    }}>
        {children}
    </SettingContext.Provider>
}