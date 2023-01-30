// imports
import '../styles/platform.css'
import simplelogo from '../images/simplelogo.png'
import { Link } from 'react-router-dom';
import RegexAgents from '../components/platform/RegexAgents';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_REGEX_AGENTS } from '../utils/queries';
import AccountNav from '../components/navbar/AccountNav';

const Home = () => {
    const [filterState, setFilterState] = useState('');
    const {loading, data, refetch} = useQuery(QUERY_REGEX_AGENTS, {
        variables: {key: filterState}
    });

    return (
        <>
        <div style={{minHeight: '95vh', backgroundColor: 'white'}}>
            <div style={{minHeight: '15vh', backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Link to='/'><img src={simplelogo} alt='vive logo' style={{margin: '20px', maxHeight: '13vh', maxWidth: '22vw'}} /></Link>
                <input style={{}} className='searchBar' placeholder="" onChange={(event) => {
                    
                    setFilterState(event.target.value.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0').replace(/\[/g, "&#91;"));
                    refetch();
                }} />
                {/* <div className='tagBtn'>Hey</div> */}
                <AccountNav/>
                {/* <div style={{width: '40vw', display: 'flex', justifyContent: 'end', marginRight: '2vw'}}>
                    <AccountNav />
                </div> */}
            </div>
            <div style={{minHeight: '80vh', backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
                <div style={{minHeight: '80vh', width: '100vw',}}>
                    {loading ? (<CircularProgress />) : (<RegexAgents data={data}/>)}
                </div>
            </div>
        </div>
        {/* <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '95vh'}}>
            <Link to='/'><img src={vortexlogo} alt='vive logo' style={{margin: '20px'}} /></Link>
            <input placeholder='Search' onChange={(event) => {
                setFilterState(event.target.value);
                refetch();
            }} />
            {loading ? (<CircularProgress />) : (<RegexAgents data={data}/>)}
        </div> */}
        </>
    );
}


export default Home;
