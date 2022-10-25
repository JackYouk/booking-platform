// imports
import * as React from 'react';
import {CircularProgress, Box, Grid} from '@mui/material';


import { useQuery } from '@apollo/client';
import { QUERY_AGENTS } from "../utils/queries";
import AgentCard from "../components/AgentCard";


const Home = () => {
    const {loading, data} = useQuery(QUERY_AGENTS);

    return (
        
        <div style={{marginTop: '10px'}}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {data.agents.map(agentData => {
                        return (
                            <Grid item xs="auto" key={agentData._id}>
                                <AgentCard data={agentData}/> 
                            </Grid> 
                        );     
                    })}
                </Grid>
            )}   
        </div>
    );
}


export default Home;
