// imports
import * as React from 'react';
import {Grid} from '@mui/material';
import ResponsiveAppBar from '../components/navbar/NavBar';
import ScrollToTopButton from '../components/ScrollBtn';
import Searchbar from '../components/Searchbar';
import Filter from '../components/Filter';
import FilteredAgents from '../components/FilteredAgents';
import AllAgents from '../components/AllAgents';
import AgentsByTagContainer from '../components/AgentsByTag';
import '../components/platform.css'

let selectedTags = [];

const Home = () => {


    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'black' }}>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'left',  width: '90vw' }}>
                    <div style={{marginTop: '10px'}}>
                        <Filter selectedTags={selectedTags} />
                    </div>
            </div>
        
            
            <Grid container justifyContent='center'>
                <Grid item xs={12} md={11}>
                    <FilteredAgents selectedTags={selectedTags} />
                </Grid>
                <Grid item xs={12} md={11}>
                    <AgentsByTagContainer />
                </Grid>

                <Grid item xs={12} md={11}>
                <AllAgents />
                </Grid>
            </Grid>

            <div style={{position: 'fixed', bottom: 30, right: 30}}>
                <ScrollToTopButton />
            </div>
        </div>

    );
}


export default Home;
