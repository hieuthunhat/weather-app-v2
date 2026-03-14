import React from 'react';
import {Box, Card, Grid, Skeleton, Stack} from "@mui/material";

const AnalyticsPageSkeleton = () => (
    <Box>
        <Box paddingBlock={2}>
            <Skeleton variant="rounded" width={200} height={40} sx={{borderRadius: 1}}/>
        </Box>
        <Grid container spacing={3}>
            {[...Array(4)].map((_, i) => (
                <Grid key={i} size={{xs: 12, md: 6}}>
                    <Card sx={{borderRadius: 3}}>
                        <Stack padding={2}>
                            <Skeleton variant="text" width="40%" height={28}/>
                            <Skeleton variant="rounded" width="100%" height={350} sx={{borderRadius: 2, mt: 1}}/>
                        </Stack>
                    </Card>
                </Grid>
            ))}
        </Grid>
    </Box>
);

export default AnalyticsPageSkeleton;