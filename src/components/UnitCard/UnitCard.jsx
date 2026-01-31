import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const UnitCard = ({label, unit, dataNumber, isShow = true, icon}) => {
  return (
    isShow &&
    <Box bgcolor={'AccentColorText'}>
        <Stack direction={{ xs: 'column', sm: 'row' }}>
            {icon}
            <Box>
                <Typography>{label}</Typography>
                <Typography>{dataNumber} {unit}</Typography>
            </Box>
        </Stack>
    </Box>
  )
}

export default UnitCard