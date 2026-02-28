import { Card, List, Stack, Typography, useMediaQuery } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { formatUnixWithTZ } from "../../helpers/helpers.jsx";
import HourlyUnit from "../DailyUnit/HourlyUnit.jsx";

const timeAxisConfig = (timeData, scaleType = "point") => ({
    data: timeData,
    scaleType,
    valueFormatter: (v) => formatUnixWithTZ({ unix: v, allowHours: true }),
    tickLabelInterval: (_value, index) => index % 24 === 0,
});

const chartHeight = 350;

const HourlyWeatherCard = ({ data }) => {
    const hourly = data?.hourly;
    const units = data?.hourly_units;
    const isLargeScreen = useMediaQuery("(min-width:1024px)");

    if (!hourly?.time?.length) return null;

    const time = hourly.time;

    // if (!isLargeScreen) {
    //     const hourlyForecastData = time.map((date, index) => ({
    //         date,
    //         weatherCode: hourly.weather_code?.[index],
    //         temperature_2m: hourly.temperature_2m?.[index],
    //         precipitation: hourly.precipitation?.[index],
    //         rain: hourly.rain?.[index],
    //         showers: hourly.showers?.[index],
    //         snowfall: hourly.snowfall?.[index],
    //         windDirection: hourly.wind_direction_10m?.[index],
    //         windSpeed: hourly.wind_speed_10m?.[index],
    //         hourly_units: units,
    //     }));

    //     return (
    //         <Card>
    //             <Stack padding={2}>
    //                 <Typography fontWeight="bold" fontSize={20}>
    //                     7 Days Forecast
    //                 </Typography>
    //                 <List>
    //                     {hourlyForecastData.map((item, index) => (
    //                         <HourlyUnit data={item} id={index} key={index} />
    //                     ))}
    //                 </List>
    //             </Stack>
    //         </Card>
    //     );
    // }

    return (
        <Stack spacing={3}>
            {/* Temperature */}
            <Card>
                <Stack padding={2}>
                    <Typography fontWeight="bold" fontSize={20}>
                        Temperature
                    </Typography>
                    <LineChart
                        height={chartHeight}
                        xAxis={[timeAxisConfig(time)]}
                        yAxis={[{ label: units?.temperature_2m }]}
                        series={[
                            {
                                data: hourly.temperature_2m,
                                label: `Temperature (${units?.temperature_2m ?? ""})`,
                                showMark: false,
                            },
                            {
                                data: hourly.apparent_temperature,
                                label: `Feels Like (${units?.apparent_temperature ?? ""})`,
                                showMark: false,
                            },
                        ]}
                    />
                </Stack>
            </Card>

            {/* Wind */}
            <Card>
                <Stack padding={2}>
                    <Typography fontWeight="bold" fontSize={20}>
                        Wind
                    </Typography>
                    <LineChart
                        height={chartHeight}
                        xAxis={[timeAxisConfig(time)]}
                        yAxis={[{ label: units?.wind_speed_10m }]}
                        series={[
                            {
                                data: hourly.wind_speed_10m,
                                label: `Wind Speed (${units?.wind_speed_10m ?? ""})`,
                                showMark: false,
                            },
                            {
                                data: hourly.wind_gusts_10m,
                                label: `Wind Gusts (${units?.wind_gusts_10m ?? ""})`,
                                showMark: false,
                            },
                        ]}
                    />
                </Stack>
            </Card>

            {/* Precipitation */}
            <Card>
                <Stack padding={2}>
                    <Typography fontWeight="bold" fontSize={20}>
                        Precipitation
                    </Typography>
                    <BarChart
                        height={chartHeight}
                        xAxis={[timeAxisConfig(time, "band")]}
                        yAxis={[{ label: units?.precipitation }]}
                        series={[
                            {
                                data: hourly.precipitation,
                                label: `Precipitation (${units?.precipitation ?? ""})`,
                                stack: "precip",
                            },
                            {
                                data: hourly.rain,
                                label: `Rain (${units?.rain ?? ""})`,
                                stack: "precip",
                            },
                            {
                                data: hourly.showers,
                                label: `Showers (${units?.showers ?? ""})`,
                                stack: "precip",
                            },
                            {
                                data: hourly.snowfall,
                                label: `Snowfall (${units?.snowfall ?? ""})`,
                                stack: "precip",
                            },
                        ]}
                    />
                </Stack>
            </Card>

            {/* Humidity & Cloud Cover */}
            <Card>
                <Stack padding={2}>
                    <Typography fontWeight="bold" fontSize={20}>
                        Humidity & Cloud Cover
                    </Typography>
                    <LineChart
                        height={chartHeight}
                        xAxis={[timeAxisConfig(time)]}
                        yAxis={[{ label: "%" }]}
                        series={[
                            {
                                data: hourly.relative_humidity_2m,
                                label: `Humidity (${units?.relative_humidity_2m ?? ""})`,
                                showMark: false,
                            },
                            {
                                data: hourly.cloud_cover,
                                label: `Cloud Cover (${units?.cloud_cover ?? ""})`,
                                showMark: false,
                            },
                        ]}
                    />
                </Stack>
            </Card>
        </Stack>
    );
};

export default HourlyWeatherCard;
