import React, {useContext} from 'react';
import {
    Box,
    Button,
    Card,
    Chip,
    Divider,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Switch,
    Typography,
} from "@mui/material";
import {SettingContext} from "../contexts/SettingContext.jsx";
import {ThemeContext} from "../contexts/ThemeContext.jsx";
import {THEME_TEMPLATES} from "../contexts/ThemeContext.jsx";
import {DARK_THEME} from "../consts/settingConstants.js";

const HOME_CARDS = {
    forecastHourlyCard: 'Hourly Forecast Chart',
    dailyWeatherCard: 'Daily Forecast Card',
};

const CURRENT_WEATHER_ELEMENTS = {
    map: 'Map',
    feelsLike: 'Feels Like',
    windSpeed: 'Wind Speed',
    humidity: 'Humidity',
    cloudCover: 'Cloud Cover',
    windDirection: 'Wind Direction',
    windGusts: 'Wind Gusts',
};

const ANALYTICS_COMPONENTS = {
    temperatureChart: 'Temperature Chart',
    windChart: 'Wind Chart',
    precipitationChart: 'Precipitation Chart',
    humidityCloudChart: 'Humidity & Cloud Cover Chart',
};

function SectionTitle({children}) {
    return (
        <Typography variant="h6" fontWeight={700} sx={{mt: 2, mb: 1}}>
            {children}
        </Typography>
    );
}

function ColorSwatch({color, label, onChange}) {
    return (
        <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
                component="input"
                type="color"
                value={color}
                onChange={(e) => onChange(e.target.value)}
                sx={{
                    width: 36,
                    height: 36,
                    border: '2px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    cursor: 'pointer',
                    padding: 0,
                    background: 'none',
                    '&::-webkit-color-swatch-wrapper': {padding: 0},
                    '&::-webkit-color-swatch': {border: 'none', borderRadius: 1},
                }}
            />
            <Typography variant="body2" color="text.secondary">{label}</Typography>
        </Stack>
    );
}

function Settings() {
    const {
        componentVisibility,
        toggleComponentVisibility,
        setComponentVisibility,
        defaultVisibility,
        resetOnboarding,
        unitSettings,
        setUnitSettings
    } = useContext(SettingContext);

    const handleUnitChange = (key, value) => {
        setUnitSettings(prev => ({...prev, [key]: value}));
    };

    const {
        theme,
        templateKey,
        setThemeTemplate,
        customColors,
        updateCustomColor,
        activeColors
    } = useContext(ThemeContext);

    const isDark = theme === DARK_THEME;
    const currentMode = isDark ? 'dark' : 'light';

    return (
        <Stack gap={3} padding={2} maxWidth={800} margin="0 auto" width="100%">
            <Typography variant="h5" fontWeight={700}>Settings</Typography>

            {/* Component Visibility */}
            <Card sx={{p: 2.5}}>
                <SectionTitle>Current Weather Card Elements</SectionTitle>
                <Stack gap={0.5}>
                    {Object.entries(CURRENT_WEATHER_ELEMENTS).map(([key, label]) => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Switch
                                    checked={componentVisibility.home[key]}
                                    onChange={() => toggleComponentVisibility('home', key)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </Stack>

                <Divider sx={{my: 2}}/>

                <SectionTitle>Home Page Cards</SectionTitle>
                <Stack gap={0.5}>
                    {Object.entries(HOME_CARDS).map(([key, label]) => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Switch
                                    checked={componentVisibility.home[key]}
                                    onChange={() => toggleComponentVisibility('home', key)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </Stack>

                <Divider sx={{my: 2}}/>

                <SectionTitle>Analytics Page Components</SectionTitle>
                <Stack gap={0.5}>
                    {Object.entries(ANALYTICS_COMPONENTS).map(([key, label]) => (
                        <FormControlLabel
                            key={key}
                            control={
                                <Switch
                                    checked={componentVisibility.analytics[key]}
                                    onChange={() => toggleComponentVisibility('analytics', key)}
                                />
                            }
                            label={label}
                        />
                    ))}
                </Stack>

                <Divider sx={{my: 2}}/>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setComponentVisibility(defaultVisibility)}
                >
                    Reset to Default
                </Button>
            </Card>

            {/* Unit Settings */}
            <Card sx={{p: 2.5}}>
                <SectionTitle>Units</SectionTitle>
                <Stack gap={2.5} sx={{mt: 1}}>
                    <FormControl size="small" sx={{maxWidth: 250}}>
                        <InputLabel>Temperature</InputLabel>
                        <Select
                            value={unitSettings.temperature_unit}
                            label="Temperature"
                            onChange={(e) => handleUnitChange('temperature_unit', e.target.value)}
                        >
                            <MenuItem value="celsius">Celsius (°C)</MenuItem>
                            <MenuItem value="fahrenheit">Fahrenheit (°F)</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{maxWidth: 250}}>
                        <InputLabel>Wind Speed</InputLabel>
                        <Select
                            value={unitSettings.wind_speed_unit}
                            label="Wind Speed"
                            onChange={(e) => handleUnitChange('wind_speed_unit', e.target.value)}
                        >
                            <MenuItem value="kmh">km/h</MenuItem>
                            <MenuItem value="ms">m/s</MenuItem>
                            <MenuItem value="mph">mph</MenuItem>
                            <MenuItem value="kn">Knots</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{maxWidth: 250}}>
                        <InputLabel>Precipitation</InputLabel>
                        <Select
                            value={unitSettings.precipitation_unit}
                            label="Precipitation"
                            onChange={(e) => handleUnitChange('precipitation_unit', e.target.value)}
                        >
                            <MenuItem value="mm">Millimeters (mm)</MenuItem>
                            <MenuItem value="inch">Inches (in)</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </Card>

            {/* Theme Templates */}
            <Card sx={{p: 2.5}}>
                <SectionTitle>Color Theme</SectionTitle>
                <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                    Choose a preset template or customize your own colors.
                </Typography>

                <Stack direction="row" gap={1} flexWrap="wrap" sx={{mb: 3}}>
                    {Object.entries(THEME_TEMPLATES).map(([key, tmpl]) => (
                        <Chip
                            key={key}
                            label={tmpl.name}
                            variant={templateKey === key ? 'filled' : 'outlined'}
                            color={templateKey === key ? 'primary' : 'default'}
                            onClick={() => setThemeTemplate(key)}
                            sx={{
                                fontWeight: templateKey === key ? 700 : 400,
                            }}
                        />
                    ))}
                </Stack>

                {/* Preview of active colors */}
                <Typography variant="subtitle2" sx={{mb: 1}}>
                    Preview ({isDark ? 'Dark' : 'Light'} mode)
                </Typography>
                <Stack direction="row" gap={1} sx={{mb: 2}}>
                    {Object.entries(activeColors[currentMode]).map(([field, color]) => (
                        <Stack key={field} alignItems="center" spacing={0.5}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 1,
                                bgcolor: color,
                                border: '1px solid',
                                borderColor: 'divider',
                            }}/>
                            <Typography variant="caption" color="text.secondary">
                                {field}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>

                {/* Custom color editor */}
                {templateKey === 'custom' && (
                    <>
                        <Divider sx={{my: 2}}/>
                        <SectionTitle>Customize Colors</SectionTitle>
                        <Stack direction={{xs: 'column', sm: 'row'}} gap={4}>
                            <Stack gap={1.5} flex={1}>
                                <Typography variant="subtitle2">Light Mode</Typography>
                                <ColorSwatch color={customColors.light.primary} label="Primary"
                                             onChange={(v) => updateCustomColor('light', 'primary', v)}/>
                                <ColorSwatch color={customColors.light.secondary} label="Secondary"
                                             onChange={(v) => updateCustomColor('light', 'secondary', v)}/>
                                <ColorSwatch color={customColors.light.background} label="Background"
                                             onChange={(v) => updateCustomColor('light', 'background', v)}/>
                                <ColorSwatch color={customColors.light.paper} label="Paper"
                                             onChange={(v) => updateCustomColor('light', 'paper', v)}/>
                            </Stack>
                            <Stack gap={1.5} flex={1}>
                                <Typography variant="subtitle2">Dark Mode</Typography>
                                <ColorSwatch color={customColors.dark.primary} label="Primary"
                                             onChange={(v) => updateCustomColor('dark', 'primary', v)}/>
                                <ColorSwatch color={customColors.dark.secondary} label="Secondary"
                                             onChange={(v) => updateCustomColor('dark', 'secondary', v)}/>
                                <ColorSwatch color={customColors.dark.background} label="Background"
                                             onChange={(v) => updateCustomColor('dark', 'background', v)}/>
                                <ColorSwatch color={customColors.dark.paper} label="Paper"
                                             onChange={(v) => updateCustomColor('dark', 'paper', v)}/>
                            </Stack>
                        </Stack>
                    </>
                )}
            </Card>

            {/* Reset Onboarding */}
            <Card sx={{p: 2.5}}>
                <SectionTitle>Onboarding</SectionTitle>
                <Typography variant="body2" color="text.secondary" sx={{mb: 2}}>
                    Reset the onboarding walkthrough to see it again on the Home page.
                </Typography>
                <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={resetOnboarding}
                >
                    Reset Onboarding
                </Button>
            </Card>
        </Stack>
    );
}

export default Settings;