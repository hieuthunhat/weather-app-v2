import React from 'react';
import {Box, Card, Grid, Skeleton, Stack} from "@mui/material";

const HomePageSkeleton = () => (
    <Grid container spacing={2} columns={16}>
        <Grid size={{xs: 16, md: 10}}>
            <Stack spacing={2}>
                {/* CurrentWeatherCard */}
                <Card sx={{borderRadius: 3}}>
                    <Stack direction={{xs: 'column', sm: 'row'}} padding={2} gap={2}>
                        <Box flex={1}>
                            <Skeleton variant="text" width="60%" height={40}/>
                            <Skeleton variant="text" width="40%" height={24}/>
                            <Stack direction="row" spacing={2} mt={2} alignItems="center">
                                <Skeleton variant="circular" width={80} height={80}/>
                                <Box>
                                    <Skeleton variant="text" width={120} height={50}/>
                                    <Skeleton variant="text" width={100} height={20}/>
                                </Box>
                            </Stack>
                        </Box>
                        <Box flex={1}>
                            <Skeleton variant="rounded" width="100%" height={200} sx={{borderRadius: 2}}/>
                            <Stack direction="row" flexWrap="wrap" gap={1} mt={2} justifyContent="center">
                                {[...Array(6)].map((_, i) => (
                                    <Skeleton key={i} variant="rounded" width={140} height={50}
                                              sx={{borderRadius: 2}}/>
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </Card>
                {/* ForecastHourlyCard */}
                <Card sx={{borderRadius: 3}}>
                    <Stack padding={2}>
                        <Skeleton variant="text" width="30%" height={28}/>
                        <Skeleton variant="rounded" width="100%" height={250} sx={{borderRadius: 2, mt: 1}}/>
                    </Stack>
                </Card>
            </Stack>
        </Grid>
        <Grid size={{xs: 16, md: 'grow'}}>
            {/* DailyWeatherCard */}
            <Card sx={{borderRadius: 3}}>
                <Stack padding={2} spacing={1}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Skeleton variant="text" width="40%" height={36}/>
                        <Skeleton variant="rounded" width={80} height={32} sx={{borderRadius: 1}}/>
                    </Stack>
                    {[...Array(7)].map((_, i) => (
                        <Skeleton key={i} variant="rounded" width="100%" height={60} sx={{borderRadius: 2}}/>
                    ))}
                </Stack>
            </Card>
        </Grid>
    </Grid>
);

export default HomePageSkeleton;