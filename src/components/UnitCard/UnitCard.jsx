import { Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import { getUnitIcon } from '../../consts/iconMaps';

function UnitCard({ label, dataNumber, unit, unitKey }) {
  const Icon = getUnitIcon(unitKey, dataNumber);

  return (
    <Box width={'9rem'} height={'3rem'}>
      <Card>
        <Box padding={'0.5rem'} bgcolor={'gray'}>
          <Stack direction="row" spacing={1} alignItems="center">
            {Icon && <Icon size={28} color="#4FC3F7" />}
            <Box>
              <Typography variant="body2">{label}</Typography>
              <Typography fontWeight="bold">
                {dataNumber ? dataNumber : "N/A"} {unit}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Card>
    </Box>
  );
}



export default UnitCard