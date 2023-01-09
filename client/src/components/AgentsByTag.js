import * as React from 'react';
import { CircularProgress, Box, Grid } from '@mui/material';
import { useQuery } from '@apollo/client';
import { QUERY_FILTERED_AGENTS, QUERY_TAGS } from "../utils/queries";
import AgentCard from "../components/AgentCard";

const AgentsByTag = (tagId) => {
    const { loading, data } = useQuery(QUERY_FILTERED_AGENTS, {
        variables: { tagIds: tagId.tagId }
    })
    return (
        <div>

            <div style={{ margin: '10px', display: 'flex', justifyContent: 'left' }}>
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <Grid container spacing={2} justifyContent='left'>
                            {data.filteredAgents.map(agentData => {
                                return (
                                    <Grid item xs="auto" key={agentData._id}>
                                        <AgentCard key={agentData._id} data={agentData} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </div>
                )}
            </div>
        </div>
    );
}

const AgentsByTagContainer = () => {
    const { loading, data } = useQuery(QUERY_TAGS);
    return (
        <div>
            {loading ? (
                <></>
            ) : (
                <>
                    {data.tags.map(tag => {
                        return (
                            <>
                                <h3 style={{marginLeft: '10px'}}>{tag.type}</h3>
                                <AgentsByTag tagId={tag._id} />
                            </>
                        );
                    })}
                </>
            )}
        </div>
    );
}

export default AgentsByTagContainer;