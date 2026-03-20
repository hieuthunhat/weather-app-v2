import { Card, Grid, Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { timeAxisConfig } from "../../helpers/helpers.jsx";

const chartHeight = 350;

const AirQualityCard = ({ data, visibility = {} }) => {
    const {
        aqiChart = true,
        pollutantsChart = true,
    } = visibility;

    const hourly = data?.hourly;
    if (!hourly?.time?.length) return null;

    const time = hourly.time;

    return (
        <Stack paddingBlockStart={3}>
            <Grid container spacing={3} sx={{mt: 0}}>
                {aqiChart && (
                    <Grid size={{xs: 12, lg: 6}}>
                        <Card>
                            <Stack padding={2}>
                                <Typography fontWeight="bold" fontSize={20}>
                                    Air Quality Index
                                </Typography>
                                <LineChart
                                    height={chartHeight}
                                    xAxis={[timeAxisConfig(time)]}
                                    yAxis={[{label: "AQI"}]}
                                    series={[
                                        {
                                            data: hourly.european_aqi,
                                            label: "European AQI",
                                            showMark: false,
                                        },
                                        {
                                            data: hourly.us_aqi,
                                            label: "US AQI",
                                            showMark: false,
                                        },
                                    ]}
                                />
                            </Stack>
                        </Card>
                    </Grid>
                )}

                {pollutantsChart && (
                    <Grid size={{xs: 12, lg: 6}}>
                        <Card>
                            <Stack padding={2}>
                                <Typography fontWeight="bold" fontSize={20}>
                                    Pollutant Concentrations
                                </Typography>
                                <LineChart
                                    height={chartHeight}
                                    xAxis={[timeAxisConfig(time)]}
                                    yAxis={[{label: "μg/m³"}]}
                                    series={[
                                        {
                                            data: hourly.pm2_5,
                                            label: "PM2.5 (μg/m³)",
                                            showMark: false,
                                        },
                                        {
                                            data: hourly.pm10,
                                            label: "PM10 (μg/m³)",
                                            showMark: false,
                                        },
                                        {
                                            data: hourly.ozone,
                                            label: "Ozone (μg/m³)",
                                            showMark: false,
                                        },
                                        {
                                            data: hourly.nitrogen_dioxide,
                                            label: "NO₂ (μg/m³)",
                                            showMark: false,
                                        },
                                        {
                                            data: hourly.sulphur_dioxide,
                                            label: "SO₂ (μg/m³)",
                                            showMark: false,
                                        },
                                        {
                                            data: hourly.carbon_monoxide,
                                            label: "CO (μg/m³)",
                                            showMark: false,
                                        },
                                    ]}
                                />
                            </Stack>
                        </Card>
                    </Grid>
                )}
            </Grid>
        </Stack>
    );
};

export default AirQualityCard;
