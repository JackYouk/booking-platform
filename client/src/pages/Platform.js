// imports
import * as React from 'react';
import { CircularProgress, Box, Grid, Button, ToggleButton, TextField, Autocomplete, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS, QUERY_FILTERED_AGENTS, QUERY_TAGS } from "../utils/queries";
import AgentCard from "../components/AgentCard";
import Tag from '../components/Tag';
import ResponsiveAppBar from '../components/navbar/NavBar';


const Searchbar = () => {
    const { loading, data } = useQuery(QUERY_AGENTS);
    const handleSubmit = (event) => {
        let agentId = '';
        data.agents.forEach(agent => {
            if(agent.name === event.target.value){
                agentId = agent._id
            }
        })
        window.location.href = `/agent/${agentId}`;
    }
    return (
        <div style={{ marginTop: '40px' }}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ): (
                <Stack spacing = { 2 } sx = {{ minWidth: '50vw'}}>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={data.agents.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="Search by Agent" onKeyUp={(event) => {
                            if(event.key === 'Enter'){
                                console.log(params)
                                handleSubmit(event)
                            }
                        }} />}
                    />
                </Stack>
            )}           
        </div >
    );
}

let selectedTags = [];

const Filter = () => {

    const { loading, error, data, refetch } = useQuery(QUERY_TAGS);
    if (error) {
        console.log(error)
    }

    return (
        <div style={{ margin: '10px' }}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {data.tags.map(tagData => {
                        if (!tagData.type) {
                            refetch();
                        }
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
    const { loading, data } = useQuery(QUERY_FILTERED_AGENTS, {
        variables: { tagIds: selectedTags },
        pollInterval: 100,
    });
    

    return (
        <div style={{ margin: '10px', display: 'flex', justifyContent: 'center' }}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    <Grid container spacing={2} justifyContent='center'>
                        {data.filteredAgents.map(agentData => {
                            return (
                                <Grid item xs="auto" key={agentData._id}>
                                    <AgentCard key={agentData._id} data={agentData} />
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            )}
        </div>
    );
}

const AllAgents = () => {
    const { loading, data } = useQuery(QUERY_AGENTS);

    return (
        <div style={{ margin: '10px' }}>
            <h3 style={{display: 'flex', justifyContent: "center"}}>All Agents</h3>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                // <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Grid container spacing={2} justifyContent='center'>

                    {data.agents.map(agentData => {
                        return (
                            <Grid item xs="auto" key={agentData._id}>
                                <AgentCard key={agentData._id} data={agentData} />
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
            <div style={{marginBottom: '10vh'}}>
                <ResponsiveAppBar  />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Searchbar />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <Filter />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <FilteredAgents />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <AllAgents />
            </div>
        </div>
        
    );
}


export default Home;
