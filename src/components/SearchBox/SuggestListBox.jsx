import React, {useContext, useState} from 'react';
import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import {SettingContext} from '../../contexts/SettingContext.jsx';

function SuggestListBox({suggestions = [], setSuggestions}) {
    const {setLocation} = useContext(SettingContext);

    const handleClickLocation = (value) => {
        setLocation(value);
        setIsShow(false);
        setSuggestions([]);
    };

    const [isShow, setIsShow] = useState(suggestions.length > 0);

    return (
        isShow &&
        <Box role="presentation">
            <List>
                {suggestions.map(
                    (
                        {id, name, country, admin1, admin2, admin3, longitude, latitude},
                        index
                    ) => {
                        const fullLocation = [admin3, admin2, admin1, country]
                            .filter(Boolean)
                            .join(', ');

                        return (
                            <ListItem
                                key={id ?? index}
                                disablePadding
                            >
                                <ListItemButton
                                    onClick={() =>
                                        handleClickLocation({
                                            name,
                                            locationName: fullLocation,
                                            latitude,
                                            longitude
                                        })
                                    }
                                >
                                    <ListItemText
                                        primary={name}
                                        secondary={fullLocation}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    }
                )}
            </List>
        </Box>
    );
}

export default SuggestListBox;
