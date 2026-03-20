import React, {useContext, useEffect, useState, useMemo} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {SettingContext} from "../contexts/SettingContext.jsx";
import {useFetch} from "../hooks/useFetch.js";
import {buildForecastURL, buildHistoricalURL} from "../helpers/helpers.jsx";
import {FORECAST_URL, HISTORICAL_URL} from "../consts/settingConstants.js";
import {Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography, useMediaQuery} from "@mui/material";
import AnalyticsPageSkeleton from "../components/Skeletons/AnalyticsPageSkeleton.jsx";
import HourlyWeatherCard from "../components/HourlyWeatherCard/HourlyWeatherCard.jsx";
import EmptyState from "../components/EmptyState/EmptyState.jsx";
import moment from "moment-timezone";
import MediaModal from "../components/MediaModal/MediaModal.jsx";

function Analytics() {
    const selectedLocation = useSelector(state => state.weather.location);
    const {selectedFields, selectedHistoricalFields, componentVisibility, unitSettings} = useContext(SettingContext);
    const matches = useMediaQuery('(max-width:650px)');

    const {data: weatherData, loading, fetchApi} = useFetch({
        url: null,
        initLoad: false
    });

    const today = moment().format('YYYY-MM-DD');
    const sevenDaysAgo = moment().subtract(7, 'days').format('YYYY-MM-DD');

    const {data: historicalData, loading: historicalLoading, fetchApi: fetchHistoricalApi} = useFetch({
        url: null,
        initLoad: false
    })

    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        if (!selectedLocation) {
            return;
        }
        const forecastUrl = buildForecastURL({
            url: FORECAST_URL,
            obj: selectedFields,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            units: unitSettings
        });
        const historicalUrl = buildHistoricalURL({
            url: HISTORICAL_URL,
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
            startDate: sevenDaysAgo,
            endDate: today,
            obj: selectedHistoricalFields,
            units: unitSettings,
        });
        fetchApi(forecastUrl);
        fetchHistoricalApi(historicalUrl);
    }, [selectedLocation, unitSettings])

    const mergedHourly = useMemo(() => {
        const historical = historicalData?.hourly;
        const forecast = weatherData?.hourly;
        if (!historical?.time && !forecast?.time) return null;
        if (!historical?.time) return forecast;
        if (!forecast?.time) return historical;

        // Find where forecast starts that isn't already in historical
        const historicalTimeSet = new Set(historical.time);
        const forecastStartIdx = forecast.time.findIndex(t => !historicalTimeSet.has(t));

        const allKeys = new Set([
            ...Object.keys(historical),
            ...Object.keys(forecast),
        ]);

        const merged = {};
        for (const key of allKeys) {
            const hist = historical[key] ?? [];
            const fore = forecast[key] ?? [];
            merged[key] = [
                ...hist,
                ...(forecastStartIdx >= 0 ? fore.slice(forecastStartIdx) : []),
            ];
        }
        return merged;
    }, [weatherData, historicalData]);

    const mergedUnits = useMemo(() => {
        return {
            ...historicalData?.hourly_units,
            ...weatherData?.hourly_units,
        };
    }, [weatherData, historicalData]);

    const availableDates = useMemo(() => {
        if (!mergedHourly?.time) return [];
        const seen = new Set();
        return mergedHourly.time.reduce((acc, unix) => {
            const dateStr = moment.unix(unix).format('YYYY-MM-DD');
            if (!seen.has(dateStr)) {
                seen.add(dateStr);
                acc.push({
                    value: dateStr,
                    label: moment.unix(unix).format('ddd, MMM D'),
                });
            }
            return acc;
        }, []);
    }, [mergedHourly]);

    useEffect(() => {
        if (availableDates.length > 0 && !selectedDate) {
            setSelectedDate(availableDates[0].value);
        }
    }, [availableDates]);

    const filteredData = useMemo(() => {
        if (!mergedHourly?.time || !selectedDate) return weatherData;

        const indices = [];
        mergedHourly.time.forEach((unix, index) => {
            if (moment.unix(unix).format('YYYY-MM-DD') === selectedDate) {
                indices.push(index);
            }
        });

        const filteredHourly = {};
        for (const [key, values] of Object.entries(mergedHourly)) {
            filteredHourly[key] = indices.map(i => values[i]);
        }

        return {
            ...weatherData,
            hourly: filteredHourly,
            hourly_units: mergedUnits,
        };
    }, [mergedHourly, mergedUnits, weatherData, selectedDate]);
    console.log(selectedLocation)

    return (
        <Stack justifyContent={'center'} gap={2} paddingInline={2}>
            {selectedLocation ?
                (loading || historicalLoading) ?
                    <AnalyticsPageSkeleton/>
                    :
                    <Box>
                        {matches && <MediaModal />}
                        <Stack paddingBlock={2} flexDirection={'row'} alignItems={'center'} gap={2} flexWrap={'wrap'} paddingInlineStart={2}>
                            <Typography variant={'span'}>Showing data on</Typography>
                            <Box>
                                <FormControl size={'medium'} sx={{minWidth: 200}}>
                                    <InputLabel id="date-select-label">Date</InputLabel>
                                    <Select
                                        labelId="date-select-label"
                                        id="date-select"
                                        value={selectedDate}
                                        label="Date"
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                    >
                                        {availableDates.map((date) => (
                                            <MenuItem key={date.value} value={date.value}>
                                                {date.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            in
                            <Typography variant={'span'} fontWeight={'bold'}>{selectedLocation?.name ? `${selectedLocation.name}, ${selectedLocation.locationName}` : `${selectedLocation.latitude?.toFixed(3)}, ${selectedLocation.longitude?.toFixed(3)}`}</Typography>
                        </Stack>
                        <HourlyWeatherCard data={filteredData} visibility={componentVisibility.analytics}/>
                    </Box>
                :
                <EmptyState/>
            }
        </Stack>
    );
}

export default Analytics;