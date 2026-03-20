import {useContext} from "react";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import {ThemeContext} from "../../contexts/ThemeContext.jsx";
import {useNavigate} from "react-router-dom";
import {DARK_THEME} from "../../consts/settingConstants.js";
import {
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import {MdDarkMode, MdHistory, MdLightMode} from "react-icons/md";
import {IoLocationOutline} from "react-icons/io5";
import {useSession} from "../../hooks/useSession.js";
import {setLocationData} from "../../counters/counterSlice.js";
import {useDispatch} from "react-redux";

export const DrawerList = () => {
    const {setIsOpenDrawer, setLocation} = useContext(SettingContext);
    const dispatch = useDispatch();
    const {theme, setNewTheme} = useContext(ThemeContext);
    const toggleDrawer = (value) => () => setIsOpenDrawer(value)
    const navigate = useNavigate();
    const isDark = theme === DARK_THEME;
    const {getSession} = useSession('recentSearches')
    const showRecentSearchesSession = getSession()?.reduce((acc, item) => {
        if (!acc.some(i => i.name === item.name)) acc.push(item);
        return acc;
    }, []) ?? [];

    const handleClickLocation = (value) => {
        setLocation(value);
        dispatch(setLocationData(value));
    };

    return (
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
                <Stack>
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
                    <Divider/>
                    <Stack direction="row" alignItems="center" gap={1} px={2} pt={2} pb={0.5}>
                        <MdHistory size={18} color="inherit"/>
                        <Typography variant="subtitle2" color="text.secondary" fontWeight={600}>
                            Recent searches
                        </Typography>
                    </Stack>
                    <List dense sx={{px: 1}}>
                        {showRecentSearchesSession?.map((item, idx) => (
                            <ListItem key={idx} disablePadding sx={{mb: 0.5}}>
                                <ListItemButton
                                    onClick={() => handleClickLocation(item)}
                                    sx={{borderRadius: 2, py: 0.5}}
                                >
                                    <ListItemIcon sx={{minWidth: 32}}>
                                        <IoLocationOutline size={18}/>
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.name}
                                        primaryTypographyProps={{fontSize: 14}}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Stack>
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
    )
}
