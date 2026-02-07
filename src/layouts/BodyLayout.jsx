import {Box, Container, Stack} from '@mui/material'
import React, { useContext } from 'react'
import SearchBox from '../components/SearchBox/SearchBox'
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import { SettingContext } from '../contexts/SettingContext.jsx';
import EmptyState from '../components/EmptyState/EmptyState.jsx';
import HourlyWeatherCard from '../components/HourlyWeatherCard/HourlyWeatherCard.jsx';
import DailyWeatherCard from '../components/DailyWeatherCard/DailyWeatherCard.jsx';

const BodyLayout = () => {
  const { location, data  } = useContext(SettingContext);
  return (
    // <Container>
        <Stack justifyContent={'center'} gap={2}>
            <SearchBox/>
            {location ?
                <CurrentWeatherCard/>
                :
                <EmptyState/>
            }
            {data && <DailyWeatherCard data={data} />}
        </Stack>
    // </Container>
  )
}

export default BodyLayout