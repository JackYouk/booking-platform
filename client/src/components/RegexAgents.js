import { Grid } from '@mui/material';
import AgentCard from "../components/AgentCard";


const RegexAgents = ({ data }) => {

    return (

        <>
        <Grid container width='70vw' display='flex' justifyContent='center'>
        {data.regexAgents.map(agent => {
            return (
                <>
                    <Grid item xs={8} md={5} xl={5} margin={1} key={agent._id} >
                        <AgentCard key={agent._id} data={agent} />
                    </Grid>
                </>
            );
        })}
        </Grid>
        </>
    );
}

export default RegexAgents