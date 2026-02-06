import {
    Box,
    Button, Divider, Drawer,
    Icon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField, Typography
} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce.js';
import SuggestListBox from "./SuggestListBox.jsx";
import {TiThMenu} from "react-icons/ti";
import {SettingContext} from "../../contexts/SettingContext.jsx";
import { CiLocationOn } from "react-icons/ci";

const SearchBox = () => {
    const {isOpenDrawer, setIsOpenDrawer} = useContext(SettingContext);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSuggestions = async (value) => {
        if (!value.trim()) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    value
                )}&count=6&language=en&format=json`
            );

            if (!res.ok) return;

            const data = await res.json();
            setSuggestions(data.results ?? []);
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false);
        }

    }


    const debouncedQuery = useDebounce(query, 1000);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            return;
        }

        fetchSuggestions(debouncedQuery);
    }, [debouncedQuery]);


    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };


    const toggleDrawer = (value) => () => setIsOpenDrawer(value)
    const DrawerList = (
        <Box sx={{width: 250}} role="presentation" onClick={toggleDrawer(false)}>
            <Box padding={2}>
                <Typography component="h1" variant="h5">Weather App</Typography>
            </Box>
            <Divider/>
            <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
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
        <Box padding="1rem">
            <Stack direction="row" spacing={2} alignItems={'center'}>
                <Button onClick={toggleDrawer(true)}><TiThMenu size={30} /></Button>
                <TextField
                    label="Search location"
                    variant="outlined"
                    fullWidth
                    placeholder="Ex: Hanoi, Vietnam..."
                    value={query}
                    onChange={handleQueryChange}
                    disabled={loading}
                    size={'small'}
                />
                <Button><CiLocationOn size={30} /></Button>
            </Stack>
            {query.length > 0 && suggestions.length > 0 && (
                <SuggestListBox suggestions={suggestions} setSuggestions={setSuggestions}/>)}
            <Drawer open={isOpenDrawer} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </Box>
    );
};

export default SearchBox;
