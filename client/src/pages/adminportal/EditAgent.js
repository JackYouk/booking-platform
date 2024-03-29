import { useState } from "react";

// mui
import * as React from "react";
import { Button, TextField, FormGroup, Grid, FormControlLabel, FormControl, InputLabel, Select, Checkbox, MenuItem, Box, Typography, createTheme, CircularProgress, ToggleButton } from "@mui/material";

import { Link, redirect } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AGENT } from "../../utils/mutations";
import { QUERY_AGENTS, QUERY_TAGS } from "../../utils/queries";
import auth from "../../utils/auth";

import Tag from "../../components/platform/Tag";

const AgentSelect = (props) => {
    const { loading, data } = useQuery(QUERY_AGENTS);

    const handleChange = (event) => {
        props.setSelectedAgent(event.target.value);
    };

    const style = {
        p: 1,
        width: '100%',
    };

    return (
        <div>
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
                                <Typography component='h4' variant="h4">Select Agent</Typography>
                            </Box>

                            <Box sx={style} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Agent</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={props.selectedAgent}
                                    label="Agent"
                                    onChange={handleChange}
                                    >
                                        {data.agents.map(agent => {
                                            return (
                                                <MenuItem value={agent._id}>{agent.name}</MenuItem>
                                            );
                                            
                                        })}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    )}
                </div>
        </div>
    );
}

const EditAgent = () => {
    // CHECK ADMIN ==============================================================================
    const isAdmin = () => {
        if (!auth.loggedIn()) {
            return false;
        }
        const loggedInUser = auth.getProfile()
        if (loggedInUser.data.email === 'zadmin@nimdaz.org') {
            return true;
        }
        return false;
    }

    // AGENT SELECT ======================================================================================
    const [selectedAgent, setSelectedAgent] = useState('');
    

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

    // CLOUDINARY WIDGET ==============================================================================

    const [picState, setPicState] = useState('777');
    const setPicUrl = (picUrl) => {
        setPicState(picUrl);
        return;
    }

    const cloudName = "vortexconsultantimgs";
    const uploadPreset = "fifvosaj";
    const cloudinaryWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            // showAdvancedOptions: true,  //add advanced options (public_id and tag)
            // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                console.log("Done! Here is the image info: ", result.info);
                setPicUrl(result.info.secure_url);
                console.log(picState);
                document
                    .getElementById("uploadedimage")
                    .setAttribute("src", result.info.secure_url);

                setPicUrl(result.info.secure_url);
                console.log(picState);

            }
        }
    );


    // EDIT AGENT MUTATION ==============================================================================

    const [editAgent] = useMutation(EDIT_AGENT, {
        variables: {
            id: selectedAgent,
            name: formState.name,
            industries: formState.industries,
            bio: formState.bio,
            acheivements: formState.acheivements,
            instagram: formState.instagram,
            twitter: formState.twitter,
            linkedin: formState.linkedin,
            rating: formState.rating,
            expertIn: selectedIdsArr,
            imgPath: picState,
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(selectedAgent);
        try {
            const { data } = await editAgent({
                id: selectedAgent,
                name: formState.name,
                industries: formState.industries,
                bio: formState.bio,
                acheivements: formState.acheivements,
                instagram: formState.instagram,
                twitter: formState.twitter,
                linkedin: formState.linkedin,
                rating: formState.rating,
                expertIn: selectedIdsArr,
                imgPath: picState,
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
                                <Typography component='h1' variant="h4">Edit Agent</Typography>
                            </Box>

                            <Box sx={style}>
                                <AgentSelect selectedAgent={selectedAgent} setSelectedAgent={setSelectedAgent}/>
                            </Box>

                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Name"
                                    name="name"
                                    type='text'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Industries"
                                    name="industries"
                                    type='text'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Bio"
                                    name="bio"
                                    type='text'
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Acheivements"
                                    name="acheivements"
                                    type='text'
                                    multiline
                                    rows={4}
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Instagram?"
                                    name="instagram"
                                    type='text'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Twitter?"
                                    name="twitter"
                                    type='text'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="LinkedIn?"
                                    name="linkedin"
                                    type='text'
                                    onChange={handleChange}
                                />
                            </Box>
                            <Box sx={style} >
                                <TextField
                                    sx={{ width: "100%" }}
                                    label="Rating (ex: 4.8/5)"
                                    name="rating"
                                    type='text'
                                    onChange={handleChange}
                                />
                            </Box>

                            <Box sx={style} >
                                <Button variant="text" onClick={() => cloudinaryWidget.open()}>Upload Image</Button>
                                <img id="uploadedimage" src=""></img>
                            </Box>

                            <Box sx={style} >
                                <Grid container spacing={2}>
                                    {data.tags.map(tagData => {
                                        return (
                                            <Grid item xs="auto" key={tagData._id}>
                                                <Tag type={tagData.type} id={tagData._id} selectedIds={selectedIdsArr} iconUrl={tagData.imgPath} />
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
                                    Edit Agent
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



export default EditAgent;

