import { useState } from "react";

// mui
import * as React from "react";
import { Button, TextField, CircularProgress, Grid, FormControl, InputLabel, Select, MenuItem, Box, Typography, createTheme } from "@mui/material";
import { redirect } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { ADD_AGENT, CREATE_TAG } from "../../utils/mutations";
import { QUERY_ME } from "../../utils/queries";
import auth from "../../utils/auth";


const CreateTag = () => {
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
        type: '',
    });

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setFormState({
            ...formState,
            [key]: value,
        });
    };

    const [createTag, { error, data }] = useMutation(CREATE_TAG, {
        variables: {
            type: formState.type,
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createTag({ ...formState });
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
                        <Typography component='h1' variant="h4">Create Tag</Typography>
                    </Box>

                    <Box sx={style} >
                        <TextField
                            sx={{ width: "100%" }}
                            label="Type"
                            name="type"
                            type='text'
                            onChange={handleChange}
                        />
                    </Box>

                    <Box sx={style}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Create Tag
                        </Button>
                    </Box>
                </Box>
            ) : (
                <h3>Error: Admin not logged in</h3>
            )}
        </div>
    );
};


export default CreateTag;

