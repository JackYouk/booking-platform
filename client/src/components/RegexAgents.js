import { Grid } from '@mui/material';
import AgentCard from "../components/AgentCard";


const RegexAgents = ({ data }) => {

    return (

        <>{data.regexAgents.map(agent => {
            return (
                <>
                    <Grid item xs={10} md={8} lg={4} marginBottom={4} key={agent._id}>
                        <AgentCard key={agent._id} data={agent} />
                    </Grid>
                </>
            );
        })}</>
    );
}

export default RegexAgents