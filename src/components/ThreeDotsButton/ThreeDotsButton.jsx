import React from 'react';
import {Box, Button, List, ListItem, ListItemButton, ListItemText, Popover} from "@mui/material";
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
            <Button onClick={handleClick}>
                <BsThreeDots size={20}/></Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <List>
                    {actions.map(
                        (
                            action,
                            index
                        ) => {

                            return (
                                <ListItem
                                    key={index}
                                    disablePadding
                                >
                                    <ListItemButton
                                    >
                                        <ListItemText primary={action.name}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        }
                    )}
                </List>
            </Popover>
        </Box>
    );
}

export default ThreeDotsButton;