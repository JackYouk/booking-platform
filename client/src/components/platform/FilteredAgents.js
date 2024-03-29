import { CircularProgress, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_FILTERED_AGENTS } from "../../utils/queries";
import AgentCard from "../components/AgentCard";

const FilteredAgents = ({selectedTags}) => {
    const { loading, data } = useQuery(QUERY_FILTERED_AGENTS, {
        variables: { tagIds: selectedTags },
        pollInterval: 100,
    });


    return (
        <div style={{ margin: '10px', display: 'flex', justifyContent: 'left' }}>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <div style={{display: 'flex', justifyContent: 'left'}}>
                    {data.filteredAgents.length > 0 ? (
                        <>
                        {/* <div>Filtered Agents</div> */}
                        <Grid container display='flex' justifyContent='center'>
                        {data.filteredAgents.map(agentData => {
                            return (
                                <Grid item xs={10} md={8} lg={4} marginBottom={4} key={agentData._id}>
                                    <AgentCard key={agentData._id} data={agentData} />
                                </Grid>
                            );
                        })}
                        </Grid>
                        </>
                    ) : (
                        <></>
                    )}
                    
                </div>
            )}
        </div>
    );
}

export default FilteredAgents;