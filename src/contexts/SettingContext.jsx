import { createContext, useState } from "react";
import { FEELS_LIKE_TEMPERATURE, IS_DAY, PRECIPITATION, RELATIVE_HUMIDITY, SHOWERS, SNOWFALL, TEMPERATURE, WEATHER_CODE, WIND_SPEED } from "../consts/settingConstants.js";

export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [theme, setTheme] = useState('light');
    const [data, setData] = useState()
    const [location, setLocation] = useState(null);
    const [selectedFields, setSelectedFields] = useState({
        daily: [],
        current: [TEMPERATURE, WIND_SPEED, RELATIVE_HUMIDITY, WEATHER_CODE, IS_DAY, PRECIPITATION, SHOWERS, SNOWFALL, FEELS_LIKE_TEMPERATURE],
        hourly: [],
        temperature_unit: []
    });
    const [showElements, setShowElements] = useState([]);

    return <SettingContext.Provider value={{ isOpenDrawer, setIsOpenDrawer, theme, setTheme, setLocation, location, selectedFields, setSelectedFields, data, setData }}>
        {children}
    </SettingContext.Provider>
}