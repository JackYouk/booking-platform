import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_AGENT } from "../utils/queries";
import { CircularProgress, Box } from "@mui/material";


const Agent = () => {
    const paramId = useParams()['*'];
    console.log(paramId);

    const {loading, data} = useQuery(QUERY_AGENT, {
        variables: {agentId: paramId},
    });

    return (
        <div>
            <h1></h1>
            {loading ? (
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <h1>{data.agent.name}</h1>
            )}
            
        </div>
    );
} 

export default Agent;