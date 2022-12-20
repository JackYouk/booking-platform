import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { InlineWidget, useCalendlyEventListener } from "react-calendly";


const BookingComponent = (props) => {
    const steps = ['Select Package', 'Add info', 'Schedule A Call'];

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    useCalendlyEventListener({
        onProfilePageViewed: () => console.log("onProfilePageViewed"),
        onDateAndTimeSelected: () => console.log("onDateAndTimeSelected"),
        onEventTypeViewed: () => console.log("onEventTypeViewed"),
        onEventScheduled: (e) => console.log(e.data),
    });

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper color='secondary' activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Meeting scheduled successful: check your email for further information, including the zoom link.
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button color='secondary' onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {activeStep === 0 ? (
                        <>
                            <div>
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                                    Quick Talk
                                </Typography>
                                <div>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>15min</Button>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>30min</Button>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>45min</Button>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>60min</Button>
                                </div>
                            </div>
                            <div>
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                                    Packages
                                </Typography>
                                <div>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>1-Quarter Contract</Button>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>Build a business pipeline</Button>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>Coffee Date</Button>
                                    <Button color='secondary' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>Meet once a week</Button>
                                </div>
                            </div>
                        </>) : (<></>)}
                    {activeStep === 1 ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Name"
                                    name="username"
                                    type='text'
                                    color='secondary'
                                    // onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Email"
                                    name="email"
                                    type='text'
                                    color='secondary'
                                    // onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                />
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Message"
                                    name="message"
                                    type='text'
                                    color='secondary'
                                    // onChange={handleChange}
                                    variant="outlined"
                                    size="small"
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </>) : (<></>)}
                    {activeStep === 2 ? (
                        <>
                            {/* <Button variant='outlined' size='small' color='secondary' sx={{ width: '100px', }} onClick={() => props.setModal(true)}>
                                Schedule
                            </Button> */}
                            <InlineWidget
                                url="https://calendly.com/jackyoukstetter1/test"
                                pageSettings={{
                                    backgroundColor: 'ffffff',
                                    hideEventTypeDetails: false,
                                    hideLandingPageDetails: false,
                                    primaryColor: 'D5AD6D',
                                    textColor: 'black',

                                }}
                                // styles={{maxHeight: '80%'}}
                            // utm={{}}
                            // prefill={{}}
                            />
                        </>
                    ) : (
                        <></>
                    )}

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            color='secondary'
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color='secondary' onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}

                        <Button color='secondary' onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}

export default BookingComponent;