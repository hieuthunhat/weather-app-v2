import {Button, Stack, TextField, Tooltip} from '@mui/material';
import React, {useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce.js';
import SuggestListBox from "./SuggestListBox.jsx";
import {CiLocationOn} from "react-icons/ci";
import {useFetch} from "../../hooks/useFetch.js";
import {useDispatch} from "react-redux";
import {setLocationData} from "../../counters/counterSlice.js";

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    const dispatch = useDispatch();
    const {
        fetchApi, loading
    } = useFetch({url: '', initLoad: false, successfullyFetch: data => {
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

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            x.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function success(position) {
        dispatch(setLocationData({latitude: position.coords.latitude, longitude: position.coords.longitude}));
    }

    function error() {
        alert("Sorry, no position available.");
    }

    return (
        <Stack display={'flex'} flexDirection={'row'} width={{xs: '80%', md: '40%'}} sx={{position: 'relative'}}
               gap={2} paddingInlineEnd={2}>
            <Stack width={'100%'}>
                <TextField
                    placeholder="Search location..."
                    variant="outlined"
                    fullWidth
                    value={query}
                    onChange={handleQueryChange}
                    disabled={loading}
                    size={'small'}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            color: 'primary.contrastText',
                            bgcolor: 'rgba(255,255,255,0.15)',
                            borderRadius: 2,
                            '& fieldset': {
                                borderColor: 'transparent',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgba(255,255,255,0.3)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'primary.contrastText',
                            },
                        },
                        '& .MuiOutlinedInput-input::placeholder': {
                            color: 'primary.contrastText',
                            opacity: 0.7,
                        },
                    }}
                />
            </Stack>
            <Tooltip title={'Use your location'}>
                <Button onClick={getLocation} sx={{color: 'primary.contrastText'}}><CiLocationOn size={30}/></Button>
            </Tooltip>
            {query.length > 0 && suggestions.length > 0 && (
                <SuggestListBox suggestions={suggestions} setSuggestions={setSuggestions}/>)}
        </Stack>

    )
        ;
};

export default SearchBox;
