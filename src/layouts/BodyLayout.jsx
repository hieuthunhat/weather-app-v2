import { Container } from '@mui/material'
import React from 'react'
import SearchBox from '../components/SearchBox/SearchBox'
import CurrentWeatherCard from "../components/CurrentWeatherCard/CurrentWeatherCard.jsx";

const BodyLayout = () => {
  return (
    <Container>
        <SearchBox />
        <CurrentWeatherCard />
    </Container>
  )
}

export default BodyLayout