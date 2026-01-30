import { createContext, useState } from "react";
import {RELATIVE_HUMIDITY, TEMPERATURE, WIND_SPEED} from "../consts/settingConstants.js";

export const SettingContext = createContext();

export const SettingProvider = ({children}) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [theme, setTheme] = useState('light');
    const [location, setLocation] = useState({});
    const [selectedFields, setSelectedFields] = useState({
        daily: [],
        current: [TEMPERATURE, WIND_SPEED, RELATIVE_HUMIDITY],
        hourly: [],
        temperature_unit: []
    });

    return <SettingContext.Provider value={{isOpenDrawer, setIsOpenDrawer, theme, setTheme, setLocation, location, selectedFields, setSelectedFields}}>
        {children}
    </SettingContext.Provider>
}