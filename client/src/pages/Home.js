// imports
import * as React from 'react';
import {CircularProgress, Box, Grid, Button, ToggleButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS, QUERY_FILTERED_AGENTS, QUERY_TAGS } from "../utils/queries";
import AgentCard from "../components/AgentCard";
import Tag from '../components/Tag';

const Searchbar = () => {

    return (
        <div style={{margin: '10px'}}>
            
            <TextField id="outlined-basic" label="search" variant="outlined">
            <SearchIcon />
            </TextField>
        </div>
    );
}

let selectedTags = [];

const Filter = () => {
    
    const {loading, data} = useQuery(QUERY_TAGS);


    return ( 
        <div style={{margin: '10px'}}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {data.tags.map(tagData => {
                        return (
                            <Grid item xs="auto" key={tagData._id}>
                                 <Tag type={tagData.type} id={tagData._id} selectedIds={selectedTags} />
                            </Grid> 
                        );     
                    })}
                </Grid>
            )}   
        </div>
    );
}

const FilteredAgents = () => {
    const {loading, data} = useQuery(QUERY_FILTERED_AGENTS, {
        variables: {tagIds: selectedTags},
        pollInterval: 100,
    });

    return ( 
        <div style={{margin: '10px'}}>
            <h1>Filtered Agents</h1>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                // <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <Grid container spacing={2}>
                
                    {data.filteredAgents.map(agentData => {
                        return (
                            <Grid item xs="auto" key={agentData._id}>
                                <AgentCard key={agentData._id} data={agentData}/> 
                            </Grid> 
                        );     
                    })}
                   </Grid>
                // </div>
            )}   
        </div>
    );
}

const AllAgents = () => {
    const {loading, data} = useQuery(QUERY_AGENTS);

    return ( 
        <div style={{margin: '10px'}}>
            <h1>All Agents</h1>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                // <div style={{display: 'flex', justifyContent: 'space-between'}}>
                   <Grid container spacing={2}>
                
                    {data.agents.map(agentData => {
                        return (
                            <Grid item xs="auto" key={agentData._id}>
                                <AgentCard key={agentData._id} data={agentData}/> 
                            </Grid> 
                        );     
                    })}
                   </Grid>
                // </div>
            )}   
        </div>
    );
}

const Home = () => {
    

    return (
        <div>
            <div style={{display: 'flex', }}>
                <Searchbar />
                <Filter />
            </div>
            <FilteredAgents />
            <AllAgents />
        </div>
    );
}


export default Home;
