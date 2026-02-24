import React, {useContext} from 'react'

import SearchBox from "../SearchBox/SearchBox.jsx";
import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText, Stack,
    Typography
} from "@mui/material";
import {TiThMenu} from "react-icons/ti";
import {useNavigate} from "react-router-dom";
import {SettingContext} from "../../contexts/SettingContext.jsx";

const Header = () => {
    const {isOpenDrawer, setIsOpenDrawer} = useContext(SettingContext);
    const toggleDrawer = (value) => () => setIsOpenDrawer(value)
    const navigate = useNavigate();
    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <Box padding={2}>
                <Typography component="h1" variant="h5">Weather App</Typography>
            </Box>
            <Divider/>
            <List>
                {['Home', 'Analytics', 'Settings'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => navigate(text === 'Analytics' ? '/analytics' : text === 'Settings' ? '/settings' : '/')}>
                            <ListItemIcon>
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider/>
            <Button>Light theme</Button>
        </Box>
    );
    return (
        <Box paddingTop={2}>
            <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                <Button onClick={toggleDrawer(true)}><TiThMenu size={30}/></Button>
                <SearchBox />
            </Stack>
            <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    )
}

export default Header