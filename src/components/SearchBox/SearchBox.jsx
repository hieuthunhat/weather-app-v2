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
import React, { useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce.js';
import SuggestListBox from "./SuggestListBox.jsx";
import {CiLocationOn} from "react-icons/ci";

const SearchBox = () => {
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

    return (
        <Stack display={'flex'} flexDirection={'row'} width={{xs: '80%', md: '40%'}} sx={{position: 'relative'}}
               gap={2}>
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
            <Button><CiLocationOn size={30}/></Button>
            {query.length > 0 && suggestions.length > 0 && (
                <SuggestListBox suggestions={suggestions} setSuggestions={setSuggestions}/>)}
        </Stack>

    )
        ;
};

export default SearchBox;
