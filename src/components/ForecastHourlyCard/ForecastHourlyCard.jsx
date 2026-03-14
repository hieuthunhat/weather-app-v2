import React from 'react'
import {Card, CardContent, Stack, Typography} from "@mui/material";
import {LineChart} from "@mui/x-charts/LineChart";

const ForecastHourlyCard = ({data}) => {
    const hourly = data?.hourly;
    const units = data?.hourly_units;

    const next5Hours = {
        time: hourly?.time?.slice(0, 7) ?? [],
        temperature: hourly?.temperature_2m?.slice(0, 7) ?? [],
        apparentTemp: hourly?.apparent_temperature?.slice(0, 7) ?? [],
    };

    const timeLabels = next5Hours.time.map(t => {
        const date = new Date(t * 1000);
        return `${String(date.getHours()).padStart(2, '0')}:00`;
    });

    return (
        <Card variant="outlined" sx={{borderRadius: 2}}>
            <Stack padding={1}>
                <CardContent sx={{p: 2, pb: '8px !important'}}>
                    <Typography variant="subtitle2" fontWeight={600} mb={1}>
                        Next 5 hours </Typography>

                    <LineChart
                        height={250}
                        margin={{top: 10, bottom: 55, left: 45, right: 45}}
                        series={[
                            {
                                data: next5Hours.temperature,
                                label: `Temperature (${units?.temperature_2m ?? ""})`,
                                showMark: true,
                                curve: "natural",
                            },
                            {
                                data: next5Hours.apparentTemp,
                                label: `Feel likes (${units?.apparent_temperature ?? ""})`,
                                showMark: true,
                                curve: "natural",
                            },
                        ]}
                        xAxis={[{
                            data: timeLabels,
                            scaleType: 'point',
                            tickLabelStyle: {fontSize: 11},
                        }]}
                        yAxis={[{
                            tickLabelStyle: {fontSize: 11},
                        }]}
                        slotProps={{
                            legend: {
                                direction: 'row',
                                position: {vertical: 'bottom', horizontal: 'middle'},
                                padding: 0,
                                itemMarkWidth: 10,
                                itemMarkHeight: 10,
                                markGap: 4,
                                itemGap: 12,
                                labelStyle: {fontSize: 11},
                            },
                        }}
                    />
                </CardContent>
            </Stack>
        </Card>
    );
};

export default ForecastHourlyCard;