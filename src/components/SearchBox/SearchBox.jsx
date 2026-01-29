import {Box, TextField} from '@mui/material';
import React, {useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce.js';
import SuggestListBox from "./SuggestListBox.jsx";

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
        <Box padding="1rem">
            <TextField
                label="Search location"
                variant="outlined"
                fullWidth
                placeholder="Ex: Hanoi, Vietnam..."
                value={query}
                onChange={handleQueryChange}
                disabled={loading}
            />
            {query.length > 0 && suggestions.length > 0 && (<SuggestListBox suggestions={suggestions}/>)}
        </Box>
    );
};

export default SearchBox;
