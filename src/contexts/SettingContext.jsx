import { createContext, useState } from "react";

export const SettingContext = createContext();

export const SettingProvider = ({children}) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [theme, setTheme] = useState('light');
    const [location, setLocation] = useState({});
    return <SettingContext.Provider value={{isOpenDrawer, setIsOpenDrawer, theme, setTheme, setLocation, location}}>
        {children}
    </SettingContext.Provider>
}