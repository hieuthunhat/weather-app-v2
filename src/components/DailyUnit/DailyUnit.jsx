import {Box, Card, Collapse, Divider, ListItem, ListItemButton, Stack, Typography} from '@mui/material'
import React, {useCallback, useState} from 'react'
import {formatUnixWithTZ, WeatherIcon} from '../../helpers/helpers.jsx';
import {getWeatherText} from '../../consts/weatherHelpTexts';
import {
    WiRain,
    WiShowers,
    WiSnow,
    WiUmbrella,
} from "react-icons/wi";
import DetailDailyCard from "../DetailDailyCard/DetailDailyCard.jsx";


/**
 * Date, Min, Max
 * Dropdown
 * @param {*} param0
 * @returns
 */
const DailyUnit = ({data, id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toogleOpen = useCallback(() => setIsOpen(!isOpen), [isOpen])
    const temperatureUnit = data?.daily_units?.temperature_2m_max;

    return (
        <ListItem key={id} sx={{backgroundColor: 'rgba(0, 0, 0, 0.02)', '&hover': 'rgba(255, 255, 255, 0.08)'}}>
            <ListItemButton onClick={toogleOpen}>
                <Stack width={'100%'}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} padding={2} gap={2} width={'100%'}
                           flexWrap={'wrap'}>
                        <Stack alignItems={'center'} justifyContent={'center'}>
                            <Typography>{formatUnixWithTZ(data.date)}</Typography>
                        </Stack>
                        <Stack flexDirection={'row'} alignItems={'center'} gap={2} width={200}>
                            <WeatherIcon weatherCode={data.weatherCode} size={50}/>
                            <Typography>{getWeatherText(data.weatherCode)}</Typography>
                        </Stack>
                        <Stack alignItems={'center'} justifyContent={'center'} width={100} flexDirection={'row'}
                               gap={1}>
                            <WiUmbrella size={50}/>
                            <Typography>{data.precipitationSum} %</Typography>
                        </Stack>
                        <Stack flexDirection={'row'} gap={1} alignItems={'center'} justifyContent={'center'}
                               width={150}>
                            <Typography fontWeight={'bold'}>{data.temperature_2m_max} {temperatureUnit}</Typography>
                            /
                            <Typography>{data.temperature_2m_min} {temperatureUnit}</Typography>
                        </Stack>
                    </Stack>
                    <Collapse in={isOpen} timeout={'auto'} unmountOnExit>
                        <Card>
                            <DetailDailyCard sunRise={data.sunrise} sunSet={data.sunset}
                                             precipitationSum={data.precipitationSum} showersSum={data.showersSum}
                                             rainSum={data.rainSum}
                                             snowFallSum={data.snowfallSum}
                                             uvIndex={data.uvIndex}
                                             windDirection={data}

                            />
                        </Card>
                    </Collapse>
                    <Divider/>
                </Stack>
            </ListItemButton>
        </ListItem>
    )
}

export default DailyUnit