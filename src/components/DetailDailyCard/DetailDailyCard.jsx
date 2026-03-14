import React from "react";
import {Box, Stack, Typography, Divider} from "@mui/material";
import {
    IoRainyOutline,
    IoThunderstormOutline,
    IoSnowOutline,
    IoWaterOutline,
    IoSunnyOutline,
    IoCompassOutline,
    IoUmbrellaOutline,
    IoSpeedometerOutline
} from "react-icons/io5";
import {BsSunrise, BsSunset, BsWind} from "react-icons/bs";
import {formatUnixWithTZ} from "../../helpers/helpers.jsx";

function StatItem({icon, label, value}) {
    return (
        <Stack display="flex" flexDirection={'row'} justifyContent="space-between" flexWrap={'wrap'} paddingInline={2}>
            <Stack display="flex" flexDirection={'row'} alignItems={'center'} gap={2}>
                <Box sx={{fontSize: 22}} display={'flex'} alignItems={'center'}>{icon}</Box>
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Stack>
            <Box width={'70px'}>
                <Typography fontWeight={600}>{value}</Typography>
            </Box>
        </Stack>

    );
}

function DetailDailyCard({
                             time,
                             precipitation = 0,
                             windDirection = 0,
                             windSpeed = 0,
                             showers = 0,
                             rain = 0,
                             snowFall = 0,
                             sunSet = 0,
                             sunRise = 0,
                             uvIndex = 0,
                             precipitationProbability = 0,
                             units = {}
                         }) {
    return (

        <Stack display="flex" justifyContent="space-between" flexWrap={'wrap'} padding={1} sx={{mt: 1, bgcolor: 'action.hover', borderRadius: 2}}>
            <Stack flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" fontWeight={600} flexWrap={'wrap'} paddingInlineStart={1}>
                    Day Details:
                </Typography>
                <Typography variant="span" flexWrap={'wrap'} paddingInlineStart={3}>
                    {time}
                </Typography>
            </Stack>

            <Divider/>

            <Stack spacing={1.2} padding={1}>
                <Stack>
                    <StatItem
                        icon={<IoWaterOutline/>}
                        label="Precipitation"
                        value={`${precipitation} ${units?.precipitation_sum ?? ''}`}
                    />
                    <StatItem
                        icon={<IoRainyOutline/>}
                        label="Rain"
                        value={`${rain} ${units?.rain_sum ?? ''}`}
                    />
                    <StatItem
                        icon={<IoThunderstormOutline/>}
                        label="Showers"
                        value={`${showers} ${units?.showers_sum ?? ''}`}
                    />
                    <StatItem
                        icon={<IoSnowOutline/>}
                        label="Snowfall"
                        value={`${snowFall} ${units?.snowfall_sum ?? ''}`}
                    />
                </Stack>
                <Divider />
                <Stack>
                    <StatItem
                        icon={<IoUmbrellaOutline/>}
                        label="Precipitation Probability"
                        value={`${precipitationProbability} ${units?.precipitation_probability_max ?? '%'}`}
                    />
                </Stack>
                <Divider />
                <Stack>
                    <StatItem
                        icon={<BsWind/>}
                        label="Wind Speed"
                        value={`${windSpeed} ${units?.wind_speed_10m_max ?? ''}`}
                    />
                    <StatItem
                        icon={<IoCompassOutline/>}
                        label="Wind Direction"
                        value={`${windDirection}°`}
                    />
                </Stack>
                <Divider />
                <Stack>
                    <StatItem
                        icon={<IoSunnyOutline/>}
                        label="UV Index"
                        value={uvIndex}
                    />
                </Stack>
                <Divider />
                <Stack>
                    <StatItem
                        icon={<BsSunrise/>}
                        label="Sunrise"
                        value={formatUnixWithTZ({unix: sunRise, format: 'h:mm A'})}
                    />
                    <StatItem
                        icon={<BsSunset/>}
                        label="Sunset"
                        value={formatUnixWithTZ({unix: sunSet, format: 'h:mm A'})}
                    />
                </Stack>
            </Stack>
        </Stack>

    );
}

export default DetailDailyCard;
