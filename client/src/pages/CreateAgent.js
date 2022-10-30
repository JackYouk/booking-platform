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

    // QUERY TAGS + TAG STATE ==============================================================================
    const { loading, data } = useQuery(QUERY_TAGS);

    const [tagState, setTagState] = useState([]);

    const handleTagChange = (event) => {
        
    }


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

    // STYLING ==============================================================================
    const style = {
        p: 1,
        width: '100%',
    };

    // 
    let testcount = 0;
    console.log(testcount)
    const addCount = () => {
        testcount++;
        console.log(testcount)
    }


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

                            <Box sx={style} >
                                <Grid container spacing={2}>
                                    {data.tags.map(tagData => {
                                        return (
                                            <Grid item xs="auto" key={tagData._id}>
                                                {/* <Tag type={tagData.type} onClick={() => addCount()} /> */}
                                                <ToggleButton
                                                    color="primary"
                                                    selected={false}
                                                    // onChange={}
                                                >
                                                    {tagData.type}
                                                </ToggleButton>
                                            </Grid>
                                        );
                                    })}
                                </Grid>

                                <Link to="/createTag" style={{ textDecoration: 'none' }}>
                                    <Button variant="text" textAlign="center">Create a new tag (Link)</Button>
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

