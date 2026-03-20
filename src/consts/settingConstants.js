export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

export const TEMPERATURE_UNIT_FAHRENHEIT = 'fahrenheit'
export const WEATHER_CODE = 'weather_code';

// Current weather forecast
export const TEMPERATURE = 'temperature_2m';
export const RELATIVE_HUMIDITY = 'relative_humidity_2m';
export const WIND_SPEED = 'wind_speed_10m';
export const IS_DAY = 'is_day';
export const PRECIPITATION = 'precipitation';
export const RAIN = 'rain';
export const SHOWERS = 'showers';
export const SNOWFALL = 'snowfall';
export const FEELS_LIKE_TEMPERATURE = 'apparent_temperature';
export const WIND_DIRECTION = 'wind_direction_10m';
export const WIND_GUSTS = 'wind_gusts_10m';
export const CLOUD_COVER = 'cloud_cover';

// Hourly weather forecast
export const HOURLY_TEMPERATURE = 'temperature_2m';
export const HOURLY_RELATIVE_HUMIDITY = 'relative_humidity_2m';
export const HOURLY_FEELS_LIKE_TEMPERATURE = 'apparent_temperature';
export const HOURLY_WIND_SPEED = 'wind_speed_10m';
export const HOURLY_PRECIPITATION = 'precipitation';
export const HOURLY_RAIN = 'rain';
export const HOURLY_SHOWERS = 'showers';
export const HOURLY_SNOWFALL = 'snowfall';
export const HOURLY_WIND_DIRECTION = 'wind_direction_10m';
export const HOURLY_WIND_GUSTS = 'wind_gusts_10m';
export const HOURLY_CLOUD_COVER = 'cloud_cover';

// Daily weather forecast
export const TEMPERATURE_MAX = 'temperature_2m_max';
export const TEMPERATURE_MIN = 'temperature_2m_min';
export const SUNRISE = 'sunrise';
export const SUNSET = 'sunset';
export const PRECIPITATION_SUM = 'precipitation_sum';
export const RAIN_SUM = 'rain_sum';
export const SHOWERS_SUM = 'showers_sum';
export const SNOWFALL_SUM = 'snowfall_sum';
export const WIND_SPEED_MAX = 'wind_speed_10m_max';
export const WIND_GUSTS_MAX = 'wind_gusts_10m_max';
export const DOMINANT_WIND_DIRECTION = 'wind_direction_10m_dominant';
export const UV_INDEX_MAX = 'uv_index_max';
export const PRECIPITATION_PROBABILITY_MAX = 'precipitation_probability_max';


export const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export const FORECAST_DAYS_OPTIONS = [
    { label: '7 days', value: 7 },
    { label: '16 days', value: 16 },
];

export const MAX_RECENT_SEARCHES_SESSION = 5;

export const HISTORICAL_URL = 'https://archive-api.open-meteo.com/v1/archive';
export const AIR_QUALITY_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

export const AIR_QUALITY_HOURLY_FIELDS = [
    'european_aqi',
    'us_aqi',
    'pm2_5',
    'pm10',
    'ozone',
    'nitrogen_dioxide',
    'sulphur_dioxide',
    'carbon_monoxide',
];
