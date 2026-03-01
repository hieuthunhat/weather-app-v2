import React, {createContext, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from "@mui/material";
import {useStorage} from "../hooks/useStorage.js";
import {DARK_THEME, LIGHT_THEME} from "../consts/settingConstants.js";

export const ThemeContext = createContext({});

const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {main: '#0288D1'},
        secondary: {main: '#4FC3F7'},
        background: {default: '#F5F7FA', paper: '#FFFFFF'},
        text: {primary: '#1A2138', secondary: '#5F6B7A'},
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {main: '#4FC3F7'},
        secondary: {main: '#81D4FA'},
        background: {default: '#0D1117', paper: '#161B22'},
        text: {primary: '#E6EDF3', secondary: '#8B949E'},
    },
});

export const ThemeProvider = ({children}) => {
    const [storedTheme, setStoredValue] = useStorage({key: 'THEME_CONTEXT'});
    const [theme, setTheme] = useState(storedTheme || LIGHT_THEME);

    const setNewTheme = () => {
        const next = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        setTheme(next);
        setStoredValue(next);
    };

    const muiTheme = useMemo(
        () => (theme === DARK_THEME ? darkTheme : lightTheme),
        [theme],
    );

    return (
        <ThemeContext.Provider value={{theme, setNewTheme}}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};
