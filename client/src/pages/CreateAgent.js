import { useState } from "react";

// mui
import * as React from "react";
import { Button, TextField, FormGroup, Grid, FormControlLabel, Checkbox, MenuItem, Box, Typography, createTheme, CircularProgress, ToggleButton } from "@mui/material";

import { Link, redirect } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { ADD_AGENT } from "../utils/mutations";
import { QUERY_TAGS } from "../utils/queries";
import auth from "../utils/auth";

import Tag from "../components/Tag";


const CreateAgent = () => {
    // CHECK ADMIN ==============================================================================
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

    // QUERY TAGS + SELECTED TAGS ARRAY ==============================================================================
    const { loading, data } = useQuery(QUERY_TAGS);

    let selectedIdsArr = [];


    // FORM STATE ==============================================================================
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

    // ADD AGENT MUTATION ==============================================================================

    const [addAgent] = useMutation(ADD_AGENT, {
        variables: {
            name: formState.name,
            bio: formState.bio,
            expertIn: selectedIdsArr,
        }
    });

    const handleSubmit = async (event) => {
        console.log(selectedIdsArr);
        event.preventDefault();
        try {
            const { data } = await addAgent({ 
                name: formState.name,
                bio: formState.bio,
                expertIn: selectedIdsArr 
            });
            window.location.href = '/';
            return data;
        } catch (error) {
            console.error(error);
        }
    };

    // STYLING ==============================================================================
    const style = {
        p: 1,
        width: '100%',
    };

    // HTML ========================================================================================
    return (
        <div>
            {isAdmin() ? (
                <div>
                    {loading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box
                            sx={{ justifyContent: 'center', m: 'auto', width: { xs: '75%', sm: '60%', md: '50%', lg: '40%', xl: '30%' } }}
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

                            <Box sx={style} >
                                <Grid container spacing={2}>
                                    {data.tags.map(tagData => {
                                        return (
                                            <Grid item xs="auto" key={tagData._id}>
                                                <Tag type={tagData.type} id={tagData._id} selectedIds={selectedIdsArr}/>
                                            </Grid>
                                        );
                                    })}
                                </Grid>

                                <Link to="/createTag" style={{ textDecoration: 'none' }}>
                                    <Button variant="text">Create a new tag (Link)</Button>
                                </Link>
                            </Box>

                            <Box sx={style}>
                                <Button variant="contained" onClick={handleSubmit}>
                                    Create Agent
                                </Button>
                            </Box>
                        </Box>
                    )}
                </div>

            ) : (
                <h3>Error: Admin not logged in</h3>
            )}
        </div>
    );
}



export default CreateAgent;

