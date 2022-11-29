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
            if (agent.name === event.target.value) {
                agentId = agent._id
            }
        })
        window.location.href = `/agent/${agentId}`;
    }
    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                // <Stack spacing={2} sx={{ minWidth: '355px' }}>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={data.agents.map((option) => option.name)}
                        alignItems='center'
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                                <TextField
                                    label={<div style={{ display: 'flex', alignItems: 'center', margin: '10px' }}><SearchIcon /> Search by agent</div>}
                                    style={{minWidth: '90vw'}}
                                    type="text"
                                    {...params.inputProps}
                                    onKeyUp={(event) => {
                                        if (event.key === 'Enter') {
                                            handleSubmit(event)
                                        }
                                    }}
                                />
                            </div>
                        )}
                    />
                // </Stack>
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
        <div >
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
                                <Tag type={tagData.type} id={tagData._id} selectedIds={selectedTags} iconUrl={tagData.imgPath} />
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
            <h3 style={{ display: 'flex', justifyContent: "left" }}>All Agents</h3>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                // <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Grid container spacing={2} justifyContent='left'>

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

const AgentsByTag = (tagId) => {
    const { loading, data } = useQuery(QUERY_FILTERED_AGENTS, {
        variables: { tagIds: tagId.tagId }
    })
    return (
        <div>

            <div style={{ margin: '10px', display: 'flex', justifyContent: 'left' }}>
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div>
                        <Grid container spacing={2} justifyContent='left'>
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
        </div>
    );
}

const AgentsByTagContainer = () => {
    const { loading, data } = useQuery(QUERY_TAGS);
    return (
        <div>
            {loading ? (
                <></>
            ) : (
                <>
                    {data.tags.map(tag => {
                        return (
                            <>
                                <h3 style={{marginLeft: '10px'}}>{tag.type}</h3>
                                <AgentsByTag tagId={tag._id} />
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}




const Home = () => {


    return (
        <div >
            <div style={{ marginBottom: '10vh' }}>
                <ResponsiveAppBar />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left', margin: '10px' }}>
                <div style={{margin: '3px'}}>
                    <Searchbar/>
                </div>
                <div style={{margin: '3px', padding: '10px', backgroundColor: 'black', borderRadius: '5px', maxWidth: '90vw'}}>
                    <Filter />
                </div>
            </div>



            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <FilteredAgents />
            </div>

            {/* colored line */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ margin: '10px', width: '80vw', height: '2px', backgroundColor: '#D4AF37' }}></div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AgentsByTagContainer />
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AllAgents />
            </div>
        </div>

    );
}


export default Home;
