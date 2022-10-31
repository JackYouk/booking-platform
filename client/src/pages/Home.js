// imports
import * as React from 'react';
import {CircularProgress, Box, Grid, Button, ToggleButton, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS, QUERY_TAGS } from "../utils/queries";
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

const Filter = () => {
    const [selected, setSelected] = useState(false);
    
    const {loading, data} = useQuery(QUERY_TAGS);

    let selectedTags = [];

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

const CardContainer = () => {
    const {loading, data} = useQuery(QUERY_AGENTS);

    return ( 
        <div style={{margin: '10px'}}>
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
            <div style={{display: 'flex', }}>
                <Searchbar />
                <Filter />
            </div>
            
            <CardContainer />
        </div>
    );
}


export default Home;
