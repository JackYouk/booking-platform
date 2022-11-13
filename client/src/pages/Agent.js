import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_AGENT } from "../utils/queries";
import { CircularProgress, Box, Button } from "@mui/material";
import ResponsiveAppBar from "../components/navbar/NavBar";


const Agent = () => {
    const paramId = useParams()['*'];
    console.log(paramId);

    const { loading, data } = useQuery(QUERY_AGENT, {
        variables: { agentId: paramId },
    });

    return (
        <div>
            <ResponsiveAppBar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20vh' }}>
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div>
                        <img src={data.agent.imgPath} />
                        <h1>{data.agent.name}</h1>
                        <a href="sms:+15105080618">
                            <Button>Text Me!</Button>
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Agent;