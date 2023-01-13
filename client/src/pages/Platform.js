// imports
import '../components/platform.css'
import vortexlogo from '../components/vortexlogo.png'
import { Link } from 'react-router-dom';
import RegexAgents from '../components/RegexAgents';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_REGEX_AGENTS } from '../utils/queries';

const Home = () => {
    const [filterState, setFilterState] = useState('');
    const {loading, data, refetch} = useQuery(QUERY_REGEX_AGENTS, {
        variables: {key: filterState}
    });

    return (
        <>
        <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '95vh'}}>
            <Link to='/'><img src={vortexlogo} alt='vive logo' style={{margin: '20px'}} /></Link>
            <input placeholder='Search' onChange={(event) => {
                setFilterState(event.target.value);
                refetch();
            }} />
            {loading ? (<CircularProgress />) : (<RegexAgents data={data}/>)}
        </div>
        </>
    );
}


export default Home;
