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
import {MdDarkMode, MdLightMode} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {DARK_THEME} from "../../consts/settingConstants.js";

const Header = () => {
    const {isOpenDrawer, setIsOpenDrawer} = useContext(SettingContext);
    const {theme, setNewTheme} = useContext(ThemeContext);
    const toggleDrawer = (value) => () => setIsOpenDrawer(value)
    const navigate = useNavigate();
    const isDark = theme === DARK_THEME;

    const DrawerList = (
        <Box
            sx={{width: 250}}
            role="presentation"
            onClick={toggleDrawer(false)}
            height={'100%'}
            display={'flex'}
            flexDirection={'column'}
        >
            <Box padding={2}>
                <Typography component="h1" variant="h5">Weather App</Typography>
            </Box>
            <Divider/>
            <Stack justifyContent={'space-between'} flexGrow={1}>
                <List>
                    {['Home', 'Analytics', 'Settings'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(text === 'Analytics' ? '/analytics' : text === 'Settings' ? '/settings' : '/')}>
                                <ListItemIcon>
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Stack>
                    <Divider/>
                    <Stack alignItems={'center'} padding={2}>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                setNewTheme();
                            }}
                            startIcon={isDark ? <MdLightMode/> : <MdDarkMode/>}
                            fullWidth
                            variant="outlined"
                        >
                            {isDark ? 'Light' : 'Dark'} theme
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
    return (
        <Box paddingBlock={1.5} bgcolor={'primary.main'}>
            <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                <Button onClick={toggleDrawer(true)} sx={{color: 'primary.contrastText'}}><TiThMenu size={30}/></Button>
                <SearchBox />
            </Stack>
            <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    )
}

export default Header
