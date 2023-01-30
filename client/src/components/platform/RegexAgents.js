import { Grid } from '@mui/material';
import AgentCard from "./AgentCard";


const RegexAgents = ({ data }) => {

    return (

        <>
        <Grid container width='100vw' display='flex' justifyContent='center'>
        {data.regexAgents.map(agent => {
            return (
                <>
                    <Grid item xs={9} md={4} lg={3} xl={2} margin={1} key={agent._id} sx={{backgroundColor: 'white'}}>
                        <AgentCard key={agent._id} data={agent}  />
                    </Grid>
                </>
            );
        })}
        </Grid>
        </>
    );
}

export default RegexAgents