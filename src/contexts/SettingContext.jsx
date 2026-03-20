import {createContext, useState} from "react";
import {useCookie} from "../hooks/useCookie.js";
import {useStorage} from "../hooks/useStorage.js";
import {
    CLOUD_COVER,
    DOMINANT_WIND_DIRECTION,
    FEELS_LIKE_TEMPERATURE, HOURLY_CLOUD_COVER, HOURLY_FEELS_LIKE_TEMPERATURE,
    HOURLY_PRECIPITATION, HOURLY_RAIN, HOURLY_RELATIVE_HUMIDITY, HOURLY_SHOWERS, HOURLY_SNOWFALL, HOURLY_TEMPERATURE,
    HOURLY_WIND_DIRECTION, HOURLY_WIND_GUSTS,
    HOURLY_WIND_SPEED,
    IS_DAY,
    PRECIPITATION, PRECIPITATION_PROBABILITY_MAX,
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
import {useNavigate} from "react-router-dom";

export const SettingContext = createContext();

export const SettingProvider = ({children}) => {
    const storedLocation = useSelector(state => state.weather.location);
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [data, setData] = useState()
    const [location, setLocation] = useState(storedLocation);
    const [selectedFields, setSelectedFields] = useState({
        daily: [TEMPERATURE_MAX, TEMPERATURE_MIN, WIND_GUSTS_MAX, WIND_SPEED_MAX, SUNRISE, SUNSET, PRECIPITATION_SUM, DOMINANT_WIND_DIRECTION, UV_INDEX_MAX, WEATHER_CODE, SHOWERS_SUM, RAIN_SUM, SNOWFALL_SUM, PRECIPITATION_PROBABILITY_MAX],
        current: [TEMPERATURE, WIND_SPEED, RELATIVE_HUMIDITY, WEATHER_CODE, IS_DAY, PRECIPITATION, SHOWERS, SNOWFALL, FEELS_LIKE_TEMPERATURE, WIND_DIRECTION, WIND_GUSTS, CLOUD_COVER],
        hourly: [HOURLY_TEMPERATURE, HOURLY_RELATIVE_HUMIDITY, HOURLY_FEELS_LIKE_TEMPERATURE, HOURLY_WIND_SPEED, HOURLY_PRECIPITATION, HOURLY_RAIN, HOURLY_SHOWERS, HOURLY_SNOWFALL, HOURLY_WIND_DIRECTION, HOURLY_WIND_GUSTS, HOURLY_CLOUD_COVER, WEATHER_CODE],
        temperature_unit: []
    });
    const [selectedHistoricalFields, setSelectedHistoricalFields] = useState({
        hourly: [HOURLY_TEMPERATURE, HOURLY_RELATIVE_HUMIDITY, HOURLY_FEELS_LIKE_TEMPERATURE, HOURLY_WIND_SPEED, HOURLY_PRECIPITATION, HOURLY_RAIN, HOURLY_SHOWERS, HOURLY_SNOWFALL, HOURLY_WIND_DIRECTION, HOURLY_WIND_GUSTS, HOURLY_CLOUD_COVER, WEATHER_CODE]
    })
    const [hideElements, setHideElements] = useState([]);
    const [unitSettings, setUnitSettings] = useStorage({
        key: 'unitSettings',
        initialValue: {
            temperature_unit: 'celsius',
            wind_speed_unit: 'kmh',
            precipitation_unit: 'mm',
        }
    });
    const [lastSearch, setLastSearchCookie] = useCookie({key: 'lastSearch', initialValue: null, maxAgeDays: 1});
    const [onboardingSkipped, setOnboardingSkipped] = useState(false);
    const onboardingDone = onboardingSkipped || lastSearch !== null;

    const defaultVisibility = {
        home: {
            forecastHourlyCard: true,
            dailyWeatherCard: true,
            map: true,
            feelsLike: true,
            windSpeed: true,
            humidity: true,
            cloudCover: true,
            windDirection: true,
            windGusts: true,
        },
        analytics: {
            temperatureChart: true,
            windChart: true,
            precipitationChart: true,
            humidityCloudChart: true,
        }
    };

    const [componentVisibility, setComponentVisibility] = useStorage({
        key: 'componentVisibility',
        initialValue: defaultVisibility
    });

    const toggleComponentVisibility = (page, component) => {
        setComponentVisibility(prev => ({
            ...prev,
            [page]: {
                ...prev[page],
                [component]: !prev[page][component]
            }
        }));
    };

    const completeOnboarding = () => {
        setOnboardingSkipped(true);
    };

    const resetOnboarding = () => {
        setOnboardingSkipped(false);
        setLastSearchCookie(null);
        window.location.href = "/"
    };

    return <SettingContext.Provider value={{
        isOpenDrawer,
        setIsOpenDrawer,
        setLocation,
        location,
        selectedFields,
        setSelectedFields,
        data,
        setData,
        hideElements,
        setHideElements,
        selectedHistoricalFields,
        setSelectedHistoricalFields,
        onboardingDone,
        completeOnboarding,
        resetOnboarding,
        lastSearch,
        setLastSearchCookie,
        componentVisibility,
        setComponentVisibility,
        toggleComponentVisibility,
        defaultVisibility,
        unitSettings,
        setUnitSettings
    }}>
        {children}
    </SettingContext.Provider>
}