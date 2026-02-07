import React, {useContext} from 'react';
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
        setSuggestions([]);
    };

    return (
        <Box 
            role="presentation"
            sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'background.paper',
                boxShadow: 3,
                borderRadius: 1,
                zIndex: 1000,
                maxHeight: '400px',
                overflowY: 'auto'
            }}
        >
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
