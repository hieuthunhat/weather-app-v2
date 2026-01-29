import { Box, Container, TextField } from '@mui/material'
import React from 'react'

const SearchBox = () => {
    return (
        <Box padding={'1rem'}>
            <TextField id="outlined-basic" label="Search location" variant="outlined" fullWidth placeholder='Ex: Hanoi, Vietnam...' />
        </Box>
    )
}

export default SearchBox