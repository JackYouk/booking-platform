import { CircularProgress, Box, TextField, Autocomplete, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS } from "../../utils/queries";
import { useState } from 'react';

const Searchbar = () => {
    const { loading, data } = useQuery(QUERY_AGENTS);
    const [searchInputState, setSearchInputState] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        let agentId = '';
        data.agents.forEach(agent => {
            if (agent.name === searchInputState) {
                agentId = agent._id
            }
        })
        if (agentId.length > 0) {
            window.location.href = `/agent/${agentId}`;
        }
    }

    return (
        <div>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div className='obsBg' style={{ padding: '12px', maxWidth: '250px', borderRadius: '5px', display: 'flex' }} onClick={(event) => event.target.className = 'goldBg'}>
                    <input
                        className='searchBarInput'
                        placeholder='search by agent'
                        type="search"
                        style={{ background: 'transparent', border: 0, color: 'black', fontWeight: 'bold', outline: 'none', maxWidth: '170px' }}
                        value={searchInputState}
                        onChange={(event) => setSearchInputState(event.target.value)}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit(event)
                            }
                        }}
                    />
                    <SearchIcon onClick={handleSubmit} />
                </div>

            )}
        </div >
    );
}

export default Searchbar;