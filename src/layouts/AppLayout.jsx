import {Box, Container} from '@mui/material'
import React from 'react'
import Header from '../components/Header/Header'
import BodyLayout from './BodyLayout'
import {SettingProvider} from '../contexts/SettingContext'

/**
 * Header
 * Side bar (drawer) Main body
 *                  Analytics
 * @returns
 */
const AppLayout = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default AppLayout