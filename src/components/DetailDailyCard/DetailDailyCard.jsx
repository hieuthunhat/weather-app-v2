import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";

import { WiSunrise, WiSunset, WiRain, WiSnow, WiStrongWind } from "react-icons/wi";
import { MdWaterDrop } from "react-icons/md";
import { BsSun } from "react-icons/bs";

function StatItem({ icon, label, value }) {
    return (
        <Box
            sx={{
                p: 1.5,
                borderRadius: 2,
                background: "rgba(255,255,255,0.65)",
                backdropFilter: "blur(4px)"
            }}
        >
            <Stack direction="row" spacing={1.5} alignItems="center">
                <Box sx={{ fontSize: 22 }}>{icon}</Box>

                <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
                    <Typography variant="body2" color="text.secondary">
                        {label}
                    </Typography>
                    <Typography fontWeight={600}>{value}</Typography>
                </Stack>
            </Stack>
        </Box>
    );
}

function DetailDailyCard({
                             sunRise,
                             sunSet,
                             precipitationSum = 0,
                             windDirection = 0,
                             uvIndex = 0,
                             showersSum = 0,
                             rainSum = 0,
                             snowFallSum = 0
                         }) {
    return (
        <Box
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: 3,
                background: "linear-gradient(180deg, #f7fbff 0%, #eef5ff 100%)",
                minWidth: 280
            }}
        >
            <Stack spacing={2}>
                <Typography variant="h6" fontWeight={600}>
                    Day Details
                </Typography>

                <Divider />

                <Stack spacing={1.2}>
                    <StatItem
                        icon={<WiSunrise />}
                        label="Sunrise"
                        value={sunRise}
                    />

                    <StatItem
                        icon={<WiSunset />}
                        label="Sunset"
                        value={sunSet}
                    />

                    <StatItem
                        icon={<MdWaterDrop />}
                        label="Precipitation"
                        value={precipitationSum}
                    />

                    <StatItem
                        icon={<WiRain />}
                        label="Rain"
                        value={rainSum}
                    />

                    <StatItem
                        icon={<WiSnow />}
                        label="Snowfall"
                        value={snowFallSum}
                    />

                    <StatItem
                        icon={<WiStrongWind />}
                        label="Wind Direction"
                        value={`${windDirection}°`}
                    />

                    <StatItem
                        icon={<BsSun />}
                        label="UV Index"
                        value={uvIndex}
                    />
                </Stack>
            </Stack>
        </Box>
    );
}

export default DetailDailyCard;
