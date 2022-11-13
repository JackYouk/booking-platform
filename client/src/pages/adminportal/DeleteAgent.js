import auth from "../../utils/auth";
import { Button, Box, Typography, CircularProgress, FormControl, Select, MenuItem, InputLabel} from "@mui/material";
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_AGENTS } from "../../utils/queries";
import { useState } from "react";
import { DELETE_AGENT } from "../../utils/mutations";


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

    const { loading, data } = useQuery(QUERY_AGENTS);

    const [selectedAgent, setSelectedAgent] = useState('');

    const [deleteAgent] = useMutation(DELETE_AGENT, {
        variables: {
            agentId: selectedAgent,
        }
    })

    const handleChange = (event) => {
        setSelectedAgent(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await deleteAgent({
                agentId: selectedAgent,
            });
            window.location.href = '/';
            return data;
        } catch (error) {
            console.error(error);
        }
        console.log(selectedAgent);
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
                                <Typography component='h1' variant="h4">Delete Agent</Typography>
                            </Box>

                            <Box sx={style} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Agent</InputLabel>
                                    <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectedAgent}
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

                            <Box sx={style}>
                                <Button variant="contained" onClick={handleSubmit}>
                                    Delete Agent
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