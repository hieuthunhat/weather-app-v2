import {Button, Stack, TextField, Tooltip} from '@mui/material';
import React, {useContext, useEffect, useState} from 'react';
import useDebounce from '../../hooks/useDebounce.js';
import SuggestListBox from "./SuggestListBox.jsx";
import {CiLocationOn} from "react-icons/ci";
import {useFetch} from "../../hooks/useFetch.js";
import {useDispatch} from "react-redux";
import {setLocationData} from "../../counters/counterSlice.js";
import {useGeolocation} from "../../hooks/useGeolocation.jsx";
import {SettingContext} from "../../contexts/SettingContext.jsx";

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);

    const {setLocation, setLastSearchCookie} = useContext(SettingContext);
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

    const handleGeolocationSuccess = async (position) => {
        const {latitude, longitude} = position.coords;
        try {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`
            );
            const data = await res.json();
            const addr = data?.address;
            const cityName = addr?.city || addr?.town || addr?.village || addr?.county || data?.name || '';
            const locationName = [addr?.state, addr?.country].filter(Boolean).join(', ');
            const locationData = {
                name: cityName || `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
                locationName,
                latitude,
                longitude
            };
            dispatch(setLocationData(locationData));
            setLocation(locationData);
            setLastSearchCookie(locationData);
        } catch {
            const locationData = {
                name: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
                locationName: '',
                latitude,
                longitude
            };
            dispatch(setLocationData(locationData));
            setLocation(locationData);
            setLastSearchCookie(locationData);
        }
    };

    const {getLocation, ToastComponent} = useGeolocation({
        successCallback: handleGeolocationSuccess
    })

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
            {ToastComponent}
        </Stack>

    )
        ;
};

export default SearchBox;
