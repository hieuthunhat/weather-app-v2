import React from 'react';
import {Box, Button, Popover} from "@mui/material";
import {BsThreeDots} from "react-icons/bs";

function ThreeDotsButton({actions}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Button variant={'outlined'} onClick={handleClick}>
                <BsThreeDots/></Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                dsadasd
            </Popover>
        </Box>
    );
}

export default ThreeDotsButton;