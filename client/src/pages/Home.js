// imports
import * as React from 'react';
import { CircularProgress, Box, Grid, Button, ToggleButton, TextField, Autocomplete, Stack } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS, QUERY_FILTERED_AGENTS, QUERY_TAGS } from "../utils/queries";
import AgentCard from "../components/AgentCard";
import Tag from '../components/Tag';

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
        <div style={{ margin: '10px' }}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ): (
                <Stack spacing = { 2 } sx = {{ width: 300 }}>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={data.agents.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="Search" onKeyUp={(event) => {
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
        <div style={{ margin: '10px' }}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div>
                    <Grid container spacing={2}>
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
            <div style={{ display: 'flex', }}>
                <Searchbar />
                <Filter />
            </div>
            <FilteredAgents />
            <AllAgents />
        </div>
    );
}


export default Home;
