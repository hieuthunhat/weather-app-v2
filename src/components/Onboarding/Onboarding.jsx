import React, {useState} from 'react';
import {Box, Button, IconButton, MobileStepper, Stack, Typography} from "@mui/material";
import {MdKeyboardArrowLeft, MdKeyboardArrowRight, MdClose} from "react-icons/md";
import {WelcomeIllustration, SearchIllustration, ForecastIllustration, CustomizeIllustration} from "./illustrations.jsx";

const steps = [
    {
        illustration: <WelcomeIllustration/>,
        title: "Welcome to Weather App",
        description: "Get real-time weather updates for any location around the world. Let's walk you through the basics!"
    },
    {
        illustration: <SearchIllustration/>,
        title: "Search a Location",
        description: "Use the search bar at the top to find any city or place. Select it to see the current weather and forecast."
    },
    {
        illustration: <ForecastIllustration/>,
        title: "Hourly & Daily Forecast",
        description: "View detailed hourly and 7-day forecasts including wind speed, precipitation, and more."
    },
    {
        illustration: <CustomizeIllustration/>,
        title: "Customize Your View",
        description: "Head to Settings to choose which weather fields you want to see and switch between light and dark themes."
    }
];

function Onboarding({onClose}) {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            onClose();
        } else {
            setActiveStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setActiveStep(prev => prev - 1);
    };

    const current = steps[activeStep];
    const isLastStep = activeStep === steps.length - 1;

    return (
        <Stack alignItems="center" spacing={2} sx={{width: '100%', pt: 4, position: 'relative'}}>
            <IconButton
                onClick={onClose}
                sx={{position: 'absolute', top: 8, right: 8}}
                size="small"
            >
                <MdClose/>
            </IconButton>

            <Box sx={{lineHeight: 0}}>
                {current.illustration}
            </Box>
            <Typography variant="h5" fontWeight={700} textAlign="center">
                {current.title}
            </Typography>
            <Typography
                variant="body1"
                color="text.secondary"
                textAlign="center"
                sx={{maxWidth: 480}}
            >
                {current.description}
            </Typography>

            <MobileStepper
                variant="dots"
                steps={steps.length}
                position="static"
                activeStep={activeStep}
                sx={{
                    bgcolor: 'transparent',
                    justifyContent: 'center',
                    '& .MuiMobileStepper-dots': {gap: 1},
                }}
                backButton={null}
                nextButton={null}
            />

            <Stack direction="row" spacing={2}>
                <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                    startIcon={<MdKeyboardArrowLeft/>}
                >
                    Back
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={handleNext}
                    endIcon={!isLastStep ? <MdKeyboardArrowRight/> : null}
                >
                    {isLastStep ? "Get Started" : "Next"}
                </Button>
            </Stack>
        </Stack>
    );
}

export default Onboarding;