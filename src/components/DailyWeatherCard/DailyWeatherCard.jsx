import { Card, List, Stack, Typography } from "@mui/material";
import UnitCard from "../UnitCard/UnitCard";
import DailyUnit from "../DailyUnit/DailyUnit";

const DailyWeatherCard = ({ data }) => {
    const daily = data?.daily;
    const dailyUnits = data?.daily_units;

    const dailyForecastData = daily?.time?.map((date, index) => ({
        date,
        weatherCode: daily.weather_code?.[index],
        temperature_2m_max: daily.temperature_2m_max?.[index],
        temperature_2m_min: daily.temperature_2m_min?.[index],
        sunrise: daily.sunrise?.[index],
        sunset: daily.sunset?.[index],
        precipitationSum: daily.precipitation_sum?.[index],
        rainSum: daily.rain_sum?.[index],
        showersSum: daily.showers_sum?.[index],
        snowfallSum: daily.snowfall_sum?.[index],
        uvIndex: daily.uv_index_max?.[index],
        windDirection: daily.wind_direction_10m_dominant?.[index],
        windSpeed: daily.wind_speed_10m_max?.[index],
        daily_units: dailyUnits,
    }));

    return (
        <Card>
            <Stack padding={2}>
                <Typography fontWeight={'bold'} fontSize={20}>7 Days Forecast</Typography>
                <List>
                    {dailyForecastData?.map((data, index) => (
                        <DailyUnit data={data} id={index} key={index} />
                    ))}
                </List>
            </Stack>
        </Card>
    );
};

export default DailyWeatherCard;