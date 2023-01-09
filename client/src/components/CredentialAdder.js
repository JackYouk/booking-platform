import { ADD_CREDENTIAL } from "../utils/mutations";
import { Button, TextField, Typography, MenuItem, Select, InputLabel, Box, CircularProgress} from "@mui/material";
import { useMutation, useQuery, } from '@apollo/client';
import { useState } from "react";
// material icon
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import SchoolIcon from '@mui/icons-material/School';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import { QUERY_ADDED_CREDENTIALS } from "../utils/queries";

const CredentialAdder = (props) => {
    const [addCredentialFormState, setAddCredentialFormState] = useState({
        title: '',
        description: '',
        link: '',
    });

    const [iconState, setIconState] = useState('');

    const handleIconChange = (event) => {
        setIconState(event.target.value);
    };

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setAddCredentialFormState({
            ...addCredentialFormState,
            [key]: value,
        });
    };

    const addToIdArr = (credentialId) => {
        props.credentialIds.push(credentialId);
    }

    const [addCredential] = useMutation(ADD_CREDENTIAL, {
        variables: {
            icon: iconState,
            title: addCredentialFormState.title,
            description: addCredentialFormState.description,
            link: addCredentialFormState.link,
        }
    });

    const submitCredential = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addCredential({
                icon: iconState,
                title: addCredentialFormState.title,
                description: addCredentialFormState.description,
                link: addCredentialFormState.link,
            });
            console.log(data)
            addToIdArr(data.addCredential._id);
            refetch();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const {loading, data, refetch} = useQuery(QUERY_ADDED_CREDENTIALS, {
        variables: {credentialIds: props.credentialIds}
    });

    return (
        <div>
            <div>
                {/* credentials */}
                {loading ? (
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <div>{data?.addedCredentials?.map(credential => {
                            return (
                                <div>{credential.title}</div>
                            )
                        })}</div>
                    )}
            </div>
            <div>
                {/* add credential */}
                <Typography>Credentials</Typography>
                <InputLabel id="demo-simple-select-standard-label">Icon</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={iconState}
                    onChange={handleIconChange}
                    label="Icon"
                >
                    <MenuItem value='work'><WorkIcon /></MenuItem>
                    <MenuItem value='business'><BusinessIcon /></MenuItem>
                    <MenuItem value='school'><SchoolIcon /></MenuItem>
                    <MenuItem value='award'><MilitaryTechIcon /></MenuItem>
                </Select>
                <TextField
                    sx={{ width: '230px', marginBottom: '5px' }}
                    label="Title"
                    name="title"
                    type='text'
                    onChange={handleChange}
                    variant="standard"
                    size="small"
                />
                <TextField
                    sx={{ width: '230px', marginBottom: '10px', }}
                    label="Description"
                    name="description"
                    type='text'
                    onChange={handleChange}
                    variant="standard"
                    size="small"
                    multiline
                    maxRows={4}
                />
                <TextField
                    sx={{ width: '230px', marginBottom: '10px', }}
                    label="Link"
                    name="link"
                    type='text'
                    onChange={handleChange}
                    variant="standard"
                    size="small"
                />
                <Button size='small' color='secondary' variant="outlined" sx={{ width: '100px', }} onClick={submitCredential}>Add</Button>
            </div>
        </div>
    )
}

export default CredentialAdder;