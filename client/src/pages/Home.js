// imports
import * as React from 'react';
import {CircularProgress, Box, Grid, Button} from '@mui/material';


import { useQuery } from '@apollo/client';
import { QUERY_AGENTS, QUERY_TAGS } from "../utils/queries";
import AgentCard from "../components/AgentCard";

const Filter = () => {
    const {loading, data} = useQuery(QUERY_TAGS);

    return ( 
        <div style={{marginTop: '10px'}}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {data.tags.map(tagData => {
                        return (
                            <Grid item xs="auto" key={tagData._id}>
                                 <Button variant="outlined">{tagData.type}</Button>
                            </Grid> 
                        );     
                    })}
                </Grid>
            )}   
        </div>
    );
}

const CardContainer = () => {
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

const Home = () => {
    

    return (
        <div>
            <Filter />
            <CardContainer />
        </div>
    );
}


export default Home;
