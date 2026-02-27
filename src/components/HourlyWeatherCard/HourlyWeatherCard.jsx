import { Card, List, Stack, Typography } from "@mui/material";
import UnitCard from "../UnitCard/UnitCard";
import HourlyUnit from "../DailyUnit/HourlyUnit.jsx";

const HourlyWeatherCard = ({ data }) => {
    const hourly = data?.hourly;
    const hourlyUnits = data?.hourly_units;

    const hourlyForecastData = hourly?.time?.map((date, index) => ({
        date,
        weatherCode: hourly.weather_code?.[index],
        temperature_2m: hourly.temperature_2m?.[index],
        precipitation: hourly.precipitation?.[index],
        rain: hourly.rain?.[index],
        showers: hourly.showers?.[index],
        snowfall: hourly.snowfall?.[index],
        windDirection: hourly.wind_direction_10m?.[index],
        windSpeed: hourly.wind_speed_10m?.[index],
        hourly_units: hourlyUnits,
    }));

    return (
        <Card>
            <Stack padding={2}>
                <Typography fontWeight={'bold'} fontSize={20}>7 Days Forecast</Typography>
                <List>
                    {hourlyForecastData?.map((data, index) => (
                        <HourlyUnit data={data} id={index} key={index} />
                    ))}
                </List>
            </Stack>
        </Card>
    );
};

export default HourlyWeatherCard;