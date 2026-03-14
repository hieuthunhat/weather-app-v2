import {Box, Card, Stack, Typography, useTheme} from '@mui/material'
import React from 'react'
import {getUnitIcon} from '../../consts/iconMaps';

function UnitCard({label, dataNumber, unit, unitKey}) {
    const Icon = getUnitIcon(unitKey, dataNumber);
    const theme = useTheme();

    return (
        <Box width={150} boxShadow={'none'}>
            <Box padding={'0.5rem'} bgcolor={'action.hover'} borderRadius={'10px'} >
                <Stack direction="row" spacing={1} alignItems="center">
                    {Icon && <Icon size={28} color={theme.palette.secondary.main}/>}
                    <Box>
                        <Typography variant="body2">{label}</Typography>
                        <Typography fontWeight="bold">
                            {dataNumber ? dataNumber : "N/A"} {unit}
                        </Typography>
                    </Box>
                </Stack>
            </Box>

        </Box>
    );
}


export default UnitCard