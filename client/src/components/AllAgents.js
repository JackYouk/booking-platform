import { CircularProgress, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_AGENTS } from "../utils/queries";
import AgentCard from "../components/AgentCard";


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

export default AllAgents;