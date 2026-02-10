import React from 'react';
import {Box, Stack, Typography} from "@mui/material";

/**
 *
 * @param sunRise
 * @param sunSet
 * @param precipitationSum
 * @param windDirection
 * @param uvIndex
 * @param showers
 * @param rain
 * @param snowFall
 * @returns {React.JSX.Element}
 * @constructor
 */
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
    return (<Box>
        <Stack direction="column" spacing={2}>
            <Typography>Day details</Typography>
            <Typography>Sun rise: {sunRise}</Typography>
            <Typography>Sun set: {sunSet}</Typography>
            <Typography>Precipitation sum: {precipitationSum}</Typography>
            <Typography>Rain sum: {rainSum}</Typography>
            <Typography>Showers sum: {showersSum}</Typography>
            <Typography>Snowfall sum: {snowFallSum}</Typography>
            <Typography>Dominant wind direction: {windDirection}</Typography>
            <Typography>UV Index: {uvIndex}</Typography>

        </Stack>
    </Box>);
}

export default DetailDailyCard;