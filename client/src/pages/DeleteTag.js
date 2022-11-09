import auth from "../utils/auth";
import { Button, Box, Typography, CircularProgress, FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TAGS } from "../utils/queries";
import { useState } from "react";
import { DELETE_TAG } from "../utils/mutations";


const DeleteAgent = () => {
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

    const { loading, data } = useQuery(QUERY_TAGS);

    const [selectedTag, setSelectedTag] = useState('');

    const [deleteTag] = useMutation(DELETE_TAG, {
        variables: {
            tagId: selectedTag,
        }
    })

    const handleChange = (event) => {
        setSelectedTag(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await deleteTag({
                tagId: selectedTag,
            });
            window.location.href = '/';
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    const style = {
        p: 1,
        width: '100%',
    };

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
                                <Typography component='h1' variant="h4">Delete Tag</Typography>
                            </Box>

                            <Box sx={style} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tag</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedTag}
                                    label="Agent"
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

                            <Box sx={style}>
                                <Button variant="contained" onClick={handleSubmit}>
                                    Delete Tag
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

export default DeleteAgent;