import React, {createContext, useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider as MuiThemeProvider} from "@mui/material";
import {useStorage} from "../hooks/useStorage.js";
import {DARK_THEME, LIGHT_THEME} from "../consts/settingConstants.js";

export const ThemeContext = createContext({});

export const THEME_TEMPLATES = {
    teal: {
        name: 'Teal (Default)',
        light: {
            primary: '#00796B',
            secondary: '#4DB6AC',
            background: '#F0FBF8',
            paper: '#FFFFFF',
        },
        dark: {
            primary: '#4DB6AC',
            secondary: '#80CBC4',
            background: '#0D1117',
            paper: '#161B22',
        }
    },
    ocean: {
        name: 'Ocean Blue',
        light: {
            primary: '#1565C0',
            secondary: '#42A5F5',
            background: '#F0F4FF',
            paper: '#FFFFFF',
        },
        dark: {
            primary: '#42A5F5',
            secondary: '#90CAF9',
            background: '#0A1929',
            paper: '#132F4C',
        }
    },
    sunset: {
        name: 'Sunset',
        light: {
            primary: '#E65100',
            secondary: '#FF8A65',
            background: '#FFF8F0',
            paper: '#FFFFFF',
        },
        dark: {
            primary: '#FF8A65',
            secondary: '#FFAB91',
            background: '#1A0E00',
            paper: '#2C1800',
        }
    },
    purple: {
        name: 'Royal Purple',
        light: {
            primary: '#6A1B9A',
            secondary: '#AB47BC',
            background: '#F9F0FF',
            paper: '#FFFFFF',
        },
        dark: {
            primary: '#CE93D8',
            secondary: '#AB47BC',
            background: '#12001A',
            paper: '#1E0030',
        }
    },
    forest: {
        name: 'Forest Green',
        light: {
            primary: '#2E7D32',
            secondary: '#66BB6A',
            background: '#F1F8E9',
            paper: '#FFFFFF',
        },
        dark: {
            primary: '#66BB6A',
            secondary: '#A5D6A7',
            background: '#0A1F0D',
            paper: '#142916',
        }
    },
    custom: {
        name: 'Custom',
        light: {
            primary: '#00796B',
            secondary: '#4DB6AC',
            background: '#F0FBF8',
            paper: '#FFFFFF',
        },
        dark: {
            primary: '#4DB6AC',
            secondary: '#80CBC4',
            background: '#0D1117',
            paper: '#161B22',
        }
    }
};

function buildMuiTheme(mode, colors) {
    return createTheme({
        palette: {
            mode,
            primary: {main: colors.primary},
            secondary: {main: colors.secondary},
            background: {default: colors.background, paper: colors.paper},
            text: mode === 'light'
                ? {primary: '#1A2138', secondary: '#5F6B7A'}
                : {primary: '#E6EDF3', secondary: '#8B949E'},
        },
    });
}

export const ThemeProvider = ({children}) => {
    const [storedTheme, setStoredTheme] = useStorage({key: 'THEME_CONTEXT'});
    const [storedTemplate, setStoredTemplate] = useStorage({key: 'THEME_TEMPLATE', initialValue: 'teal'});
    const [storedCustomColors, setStoredCustomColors] = useStorage({
        key: 'THEME_CUSTOM_COLORS',
        initialValue: THEME_TEMPLATES.custom
    });

    const [theme, setTheme] = useState(storedTheme || LIGHT_THEME);
    const [templateKey, setTemplateKey] = useState(storedTemplate);
    const [customColors, setCustomColors] = useState(storedCustomColors);

    const setNewTheme = () => {
        const next = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
        setTheme(next);
        setStoredTheme(next);
    };

    const setThemeTemplate = (key) => {
        setTemplateKey(key);
        setStoredTemplate(key);
    };

    const updateCustomColor = (mode, field, value) => {
        setCustomColors(prev => {
            const updated = {
                ...prev,
                [mode]: {...prev[mode], [field]: value}
            };
            setStoredCustomColors(updated);
            return updated;
        });
    };

    const activeColors = templateKey === 'custom' ? customColors : THEME_TEMPLATES[templateKey];
    const mode = theme === DARK_THEME ? 'dark' : 'light';

    const muiTheme = useMemo(
        () => buildMuiTheme(mode, activeColors[mode]),
        [mode, activeColors],
    );

    return (
        <ThemeContext.Provider value={{
            theme,
            setNewTheme,
            templateKey,
            setThemeTemplate,
            customColors,
            updateCustomColor,
            activeColors
        }}>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};