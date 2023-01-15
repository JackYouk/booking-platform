import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { PopupModal, useCalendlyEventListener } from "react-calendly";
import { useState } from 'react';
import TaskAltIcon from '@mui/icons-material/TaskAlt';


const BookingComponent = (props) => {
    const steps = ['Select Package', 'Add info', 'Schedule & Confirm'];

    const [calendlyModalOpen, setCalendlyModalOpen] = useState('false');

    const [formState, setFormState] = useState({
        username: '',
        company: '',
        email: '',
        message: '',
    });

    const handleFormChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setFormState({
            ...formState,
            [key]: value,
        });
    };


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
        onEventScheduled: (e) => {
            setActiveStep(steps.length);
        },
    });

    console.log(props.agentPackages)

    return (
        <Box sx={{ width: '100%', backgroundColor: 'gray', padding: '10px', borderRadius: '10px' }}>
            <Stepper color='secondary' activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    // if (isStepOptional(index)) {
                    //     labelProps.optional = (
                    //         <Typography variant="caption">Optional</Typography>
                    //     );
                    // }
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
                    <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'greenyellow' }}>
                        <div style={{ marginRight: '8px' }}>
                            <TaskAltIcon />
                        </div>
                        Scheduling Successful. Check your email inbox for zoom link and more details.
                    </div>
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
                                    <Button className='goldBg' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>15min</Button>
                                    <Button className='goldBg' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>30min</Button>
                                    <Button className='goldBg' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>45min</Button>
                                    <Button className='goldBg' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>60min</Button>
                                </div>
                            </div>
                            <div>
                                {props.agentPackages.length > 0 ? (
                                <>
                                <Typography sx={{ mt: 2, fontWeight: 'bold' }}>
                                    Packages
                                </Typography>
                                <div>
                                    {props.agentPackages.map(agentPackage => {
                                        return (<Button className='goldBg' size='small' sx={{ marginRight: '4px', mb: '5px' }} variant='contained'>{agentPackage}</Button>)
                                    })}
                                </div>
                                </>
                                ) : (<></>)}
                            </div>
                        </>) : (<></>)}
                    {activeStep === 1 ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Name"
                                    name="username"
                                    type='text'
                                    color='secondary'
                                    value={formState.username}
                                    onChange={handleFormChange}
                                    variant="filled"
                                    size="small"
                                />
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Company (Optional)"
                                    name="company"
                                    type='text'
                                    color='secondary'
                                    value={formState.company}
                                    onChange={handleFormChange}
                                    variant="filled"
                                    size="small"
                                />
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Email"
                                    name="email"
                                    type='email'
                                    color='secondary'
                                    value={formState.email}
                                    onChange={handleFormChange}
                                    variant="filled"
                                    size="small"
                                />
                                <TextField
                                    sx={{ width: '320px', margin: '5px' }}
                                    label="Message"
                                    name="message"
                                    type='text'
                                    color='secondary'
                                    value={formState.message}
                                    onChange={handleFormChange}
                                    variant="filled"
                                    size="small"
                                    multiline
                                    rows={4}
                                />
                            </div>
                        </>) : (<></>)}


                    {activeStep === 2 ? (
                        <>
                            <Button onClick={() => setCalendlyModalOpen(true)} style={{ margin: '10px', width: '95%' }} color='secondary' variant='contained'>Schedule Meeting</Button>
                            <PopupModal
                                url="https://calendly.com/jackyoukstetter1/test"
                                pageSettings={{
                                    backgroundColor: 'ffffff',
                                    hideEventTypeDetails: false,
                                    hideLandingPageDetails: false,
                                    primaryColor: '00a2ff',
                                    textColor: '4d5055'
                                }}
                                // utm={}
                                prefill={{
                                    email: formState.email,
                                    name: formState.username,
                                    customAnswers: {
                                        a1: formState.company,
                                        a2: formState.message,
                                    }
                                }}
                                onModalClose={() => setCalendlyModalOpen(false)}
                                open={calendlyModalOpen}
                                rootElement={document.getElementById("root")}
                            />

                        </>
                    ) : (<></>)}

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