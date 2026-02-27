import {
    Button,
    Stack,
    TextField
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce.js';
import SuggestListBox from "./SuggestListBox.jsx";
import {CiLocationOn} from "react-icons/ci";
import {useFetch} from "../../hooks/useFetch.js";

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const {
        fetchApi, loading
    } = useFetch({url: '', initLoad: false, successfullyFetch: data => {
            console.log(data)
            setSuggestions(data?.results || [])
        }})

    const debouncedQuery = useDebounce(query, 1000);

    useEffect(() => {
        if (!debouncedQuery.trim()) {
            setSuggestions([]);
            return;
        }

        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            debouncedQuery
        )}&count=6&language=en&format=json`

        fetchApi(url);
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
