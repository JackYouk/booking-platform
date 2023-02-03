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
        if (loggedInUser.data.email === 'zadmin@nimdaz.org') {
            return true;
        }
        return false;
    }

    // image upload
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
                document
                    .getElementById("uploadedimage")
                    .setAttribute("src", result.info.secure_url);

                setPicUrl(result.info.secure_url);
            }
        }
    );


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
            imgPath: picState,
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await createTag({
                type: formState.type,
                imgPath: picState,
            });
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

                    <Box sx={style} >
                        <Button variant="text" onClick={() => cloudinaryWidget.open()}>Upload Image</Button>
                        <img id="uploadedimage" src=""></img>
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

