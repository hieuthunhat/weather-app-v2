import { createContext, useState } from "react";

export const SettingContext = createContext();

export const SettingProvider = ({children}) => {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [theme, setTheme] = useState('light');
    return <SettingContext.Provider value={{isOpenDrawer, setIsOpenDrawer, theme, setTheme}}>
        {children}
    </SettingContext.Provider>
}