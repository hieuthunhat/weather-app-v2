import React from "react";
import {Box, Stack, Typography, Divider} from "@mui/material";

import {WiSunrise, WiSunset, WiRain, WiSnow, WiStrongWind} from "react-icons/wi";
import {MdWaterDrop} from "react-icons/md";
import {BsSun} from "react-icons/bs";
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
                             precipitation = 0,
                             windDirection = 0,
                             showers = 0,
                             rain = 0,
                             snowFall = 0
                         }) {
    return (

        <Stack display="flex" justifyContent="space-between" flexWrap={'wrap'} padding={1}>
            <Typography variant="h6" fontWeight={600}>
                Day Details
            </Typography>

            <Divider/>

            <Stack spacing={1.2} padding={1}>
                <StatItem
                    icon={<MdWaterDrop/>}
                    label="Precipitation"
                    value={precipitation}
                />

                <StatItem
                    icon={<WiRain/>}
                    label="Rain"
                    value={rain}
                />
                <StatItem
                    icon={<WiRain/>}
                    label="Showers"
                    value={showers}
                />

                <StatItem
                    icon={<WiSnow/>}
                    label="Snowfall"
                    value={snowFall}
                />

                <StatItem
                    icon={<WiStrongWind/>}
                    label="Wind Direction"
                    value={`${windDirection}°`}
                />
            </Stack>
        </Stack>

    );
}

export default DetailDailyCard;
