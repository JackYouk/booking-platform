// imports
import '../components/platform.css'
import vortexlogo from '../components/vortexlogo.png'
import { Link } from 'react-router-dom';
import RegexAgents from '../components/RegexAgents';
import { useState } from 'react';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_REGEX_AGENTS } from '../utils/queries';
import AccountNav from '../components/AccountNav';
import CheckboxesGroup from '../components/Checkbox';

const Home = () => {
    const [filterState, setFilterState] = useState('');
    const {loading, data, refetch} = useQuery(QUERY_REGEX_AGENTS, {
        variables: {key: filterState}
    });

    return (
        <>
        <div style={{minHeight: '95vh', backgroundColor: 'black'}}>
            <div style={{minHeight: '15vh', backgroundColor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Link to='/'><img src={vortexlogo} alt='vive logo' style={{margin: '20px', maxHeight: '13vh', maxWidth: '22vw'}} /></Link>
                <input style={{marginLeft: '7vw', minWidth: '40vw'}} className='searchBar' placeholder='Search' onChange={(event) => {
                    
                    setFilterState(event.target.value.replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0').replace(/\[/g, "&#91;"));
                    refetch();
                }} />
                <div style={{width: '40vw', display: 'flex', justifyContent: 'end', marginRight: '2vw'}}>
                    <AccountNav />
                </div>
            </div>
            <div style={{minHeight: '80vh', backgroundColor: 'black', display: 'flex'}}>
                <div style={{minHeight: '80vh', width: '25vw', backgroundColor: 'black'}}>
                    <div style={{width: '20vw', margin: '2vw', padding: '15px', borderRadius: '5px'}} className='goldBg'>
                        <h3 style={{ fontSize: '20px'}}>Filter by Expertise</h3>
                        <CheckboxesGroup setFilterState={setFilterState} />
                    </div>
                    
                </div>
                <div style={{minHeight: '80vh', width: '75vw',}}>
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
