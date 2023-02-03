import { CircularProgress, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS } from "../../utils/queries";
import AgentCard from "../components/AgentCard";


const AllAgents = () => {
    const { loading, data } = useQuery(QUERY_AGENTS);

    return (
        <div style={{ margin: '10px' }}>
            {/* <div className='goldBg' style={{marginLeft: '10px', borderRadius: '5px', padding: '3px', fontWeight: 'bold', fontSize: '20px', display: 'flex', justifyContent: 'center', maxWidth: '220px', marginBottom: '15px' }}>All Agents</div> */}
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

export default AllAgents;