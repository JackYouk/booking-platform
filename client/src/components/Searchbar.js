import { CircularProgress, Box, TextField, Autocomplete, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS } from "../utils/queries";

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
    const CssTextField = styled(TextField)({
        '& .MuiInput-underline:after': {
          borderBottomColor: 'black',
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: 'black',
            // borderRadius: '20px'
            // width: '200px',

          },
          '&:hover fieldset': {
            borderColor: 'black',
            // borderRadius: '20px'
            
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',
          },
        },
      });
      
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
                        color='secondary'
                        options={data.agents.map((option) => option.name)}
                        alignItems='center'
                        renderInput={(params) => (
                            <div ref={params.InputProps.ref}>
                                <CssTextField
                                    color='secondary'
                                    label={<div style={{ display: 'flex', alignItems: 'center', margin: '10px', color: '#D5AD6D' }}><SearchIcon /> Search by agent</div>}
                                    style={{minWidth: '90vw'}}
                                    type="search"
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

export default Searchbar;