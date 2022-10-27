import { useState } from "react";

// mui
import * as React from "react";
import { Button, TextField, CircularProgress, Grid, FormControl, InputLabel, Select, MenuItem, Box, Typography, createTheme } from "@mui/material";
import { redirect } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { ADD_AGENT } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";
import auth from "../utils/auth";


const CreateAgent = () => {
    const isAdmin = () => {
        if (!auth.loggedIn()) {
            return false;
        }
        const loggedInUser = auth.getProfile()
        if (loggedInUser.data.email === 'admin@za555.com') {
            return true;
        }
        return false;
    }


    const [formState, setFormState] = useState({
        name: '',
        bio: '',
    });

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setFormState({
            ...formState,
            [key]: value,
        });
    };

    const [addAgent, { error, data }] = useMutation(ADD_AGENT, {
        variables: {
            name: formState.name,
            bio: formState.bio,
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addAgent({ ...formState });
            window.location.href = '/';
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    const style = {
        p: 1,
        width: '100%',
    };

    return (
        <div>
            {isAdmin() ? (
                <Box
                    sx={{ justifyContent: 'center', m: 'auto', textAlign: 'center', width: { xs: '75%', sm: '60%', md: '50%', lg: '40%', xl: '30%' } }}
                >
                    <Box sx={style}>
                        <Typography component='h1' variant="h4">Create Agent</Typography>
                    </Box>

                    <Box sx={style} >
                        <TextField
                            sx={{ width: "100%" }}
                            label="Agent Name"
                            name="name"
                            type='text'
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={style} >
                        <TextField
                            sx={{ width: "100%" }}
                            label="Agent Bio"
                            name="bio"
                            type='text'
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={style}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Create Agent
                        </Button>
                    </Box>
                </Box>
            ) : (
                <h3>Error: Admin not logged in</h3>
            )}
        </div>
    );
}



export default CreateAgent;

