import { Box, Card, Stack, Typography } from '@mui/material'
import React from 'react'
import { FaSearchLocation } from "react-icons/fa";

const EmptyState = () => {
  return (
    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
      {/* <Card> */}
        <Stack alignItems={'center'} width={'300px'} height={'300px'} justifyContent={'center'} gap={5} color={'text.secondary'}>
          <FaSearchLocation size={100} color='inherit' />
          <Typography>Try to search for a location</Typography>
        </Stack>
      {/* </Card> */}
    </Box>
  )
}

export default EmptyState