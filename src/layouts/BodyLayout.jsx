import { Container } from '@mui/material'
import React, { useContext } from 'react'
import SearchBox from '../components/SearchBox/SearchBox'
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";
import { SettingContext } from '../contexts/SettingContext.jsx';
import EmptyState from '../components/EmptyState/EmptyState.jsx';

const BodyLayout = () => {
  const { location  } = useContext(SettingContext);
  return (
    <Container>
      <SearchBox />
      {location  ?
        <CurrentWeatherCard />
        :
        <EmptyState />
      }
    </Container>
  )
}

export default BodyLayout