import { useState } from "react";

// mui
import * as React from "react";
import { Button, TextField, FormGroup, Grid, FormControlLabel, Checkbox, MenuItem, Box, Typography, createTheme, CircularProgress, ToggleButton } from "@mui/material";

import { Link, redirect } from "react-router-dom";

import { useMutation, useQuery } from '@apollo/client';
import { ADD_AGENT } from "../../utils/mutations";
import { QUERY_TAGS } from "../../utils/queries";
import auth from "../../utils/auth";

import Tag from "../../components/Tag";
import CredentialAdder from "../../components/CredentialAdder";


const CreateAgent = () => {
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



    // QUERY TAGS + SELECTED TAGS ARRAY ==============================================================================
    const { loading, data } = useQuery(QUERY_TAGS);

    let selectedIdsArr = [];

    // CREDENTIALS STATE ==============================================================================
    let credentialIdsArr = [];

    // PACKAGES STATE ==============================================================================
    const [packageInput, setPackageInput] = useState('');
    const handlePackageInputChange = (event) => {
        setPackageInput(event.target.value);
    }

    const [packagesArr, setPackagesArr] = useState([]);
    const handleAddPackage = (event) => {
        event.preventDefault();
        const tempPackagesArr = packagesArr;
        tempPackagesArr.push(packageInput);
        setPackagesArr(tempPackagesArr);
        setPackageInput('');
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


    // ADD AGENT MUTATION ==============================================================================
    
    const [addAgent] = useMutation(ADD_AGENT, {
        variables: {
            name: formState.name,
            industries: formState.industries,
            bio: formState.bio,
            acheivements: formState.acheivements,
            credentials: credentialIdsArr,
            instagram: formState.instagram,
            twitter: formState.twitter,
            linkedin: formState.linkedin,
            rating: formState.rating,
            expertIn: selectedIdsArr,
            imgPath: picState,
            packages: packagesArr,
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addAgent({
                name: formState.name,
                industries: formState.industries,
                bio: formState.bio,
                acheivements: formState.acheivements,
                credentials: credentialIdsArr,
                instagram: formState.instagram,
                twitter: formState.twitter,
                linkedin: formState.linkedin,
                rating: formState.rating,
                expertIn: selectedIdsArr,
                imgPath: picState,
                packages: packagesArr,
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
                                <Button variant="contained" onClick={() => cloudinaryWidget.open()}>Upload Image ****Dont forget****</Button>
                                <img id="uploadedimage" src=""></img>
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

                            <Box sx={style}>
                                <div>Packages</div>
                                <ul>{packagesArr.map(packageText => {
                                    return (
                                        <li>{packageText}</li>
                                    )
                                })}</ul>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <TextField
                                        type='text'
                                        value={packageInput}
                                        onChange={handlePackageInputChange}
                                    />
                                    <Button onClick={handleAddPackage} variant="outlined">Add</Button>
                                </div>
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

                            <Box sx={style} >
                                <CredentialAdder credentialIds={credentialIdsArr} />
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

