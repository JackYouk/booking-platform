import { useState } from "react";

// mui
import * as React from "react";
import { Button, TextField, FormGroup, Grid, FormControlLabel, FormControl, InputLabel, Select, Checkbox, MenuItem, Box, Typography, createTheme, CircularProgress, ToggleButton } from "@mui/material";

import { Link, redirect } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { EDIT_AGENT, EDIT_TAG } from "../../utils/mutations";
import { QUERY_TAGS } from "../../utils/queries";
import auth from "../../utils/auth";

import Tag from "../../components/platform/Tag";

const TagSelect = (props) => {
    const { loading, data } = useQuery(QUERY_TAGS);

    const handleChange = (event) => {
        props.setSelectedTag(event.target.value);
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
                            <Typography component='h4' variant="h4">Select Tag</Typography>
                        </Box>

                        <Box sx={style} >
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={props.selectedTag}
                                    label="Tag"
                                    onChange={handleChange}
                                >
                                    {data.tags.map(tag => {
                                        return (
                                            <MenuItem value={tag._id}>{tag.type}</MenuItem>
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

    // TAG SELECT ======================================================================================
    const [selectedTag, setSelectedTag] = useState('');

    // FORM STATE ==============================================================================
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

    const [editTag] = useMutation(EDIT_TAG, {
        variables: {
            id: selectedTag,
            type: formState.type,
            imgPath: picState,
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await editTag({
                id: selectedTag,
                type: formState.type,
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
                    <Box
                        sx={{ justifyContent: 'center', m: 'auto', width: { xs: '75%', sm: '60%', md: '50%', lg: '40%', xl: '30%' } }}
                    >
                        <Box sx={style}>
                            <Typography component='h1' variant="h4">Edit Tag</Typography>
                        </Box>

                        <Box sx={style}>
                            <TagSelect selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
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

                        <Box sx={style} >
                            <Button variant="text" onClick={() => cloudinaryWidget.open()}>Upload Image</Button>
                            <img id="uploadedimage" src=""></img>
                        </Box>

                        <Box sx={style}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Edit Tag
                            </Button>
                        </Box>
                    </Box>
                </div>

            ) : (
                <h3>Error: Admin not logged in</h3>
            )}
        </div>
    );
}



export default EditAgent;

