import { Button, Card } from '@mui/material';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { SettingContext } from '../contexts/SettingContext';

const AnalysisLayout = () => {
    const navigate = useNavigate();
    
    return (
        <Card>
            <Button onClick={() => navigate('/')}>Back</Button>
        </Card>
    )
}

export default AnalysisLayout