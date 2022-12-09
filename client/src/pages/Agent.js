import { useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { QUERY_AGENT } from "../utils/queries";
import { CircularProgress, Box, Button, Rating, Grid } from "@mui/material";
import ResponsiveAppBar from "../components/navbar/NavBar";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { InlineWidget } from "react-calendly";


const Agent = () => {
    const paramId = useParams()['*'];

    const { loading, data } = useQuery(QUERY_AGENT, {
        variables: { agentId: paramId },
    });

    return (
        <div style={{maxWidth: '100vw',}}>
            <ResponsiveAppBar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8vh' }}>
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
                    <Grid container display='flex' justifyContent='center' style={{ width: '100vw'}}>
                        <Grid item sm={10} md={10} xl={6}>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '50px'}}>
                            <div style={{ display: 'flex', alignItems: 'center', width: '100vw' }}>
                                <img src={data.agent.imgPath} alt={'picture of ' + data.agent.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
                                    <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>{data.agent.name}</h1>
                                    <h2 style={{ fontSize: '20px' }}>{data.agent.industries}</h2>
                                    <div>
                                        {data.agent.instagram ? (<a href={data.agent.instagram} target='_blank'><InstagramIcon /></a>) : (<></>)}
                                        {data.agent.instagram ? (<a href={data.agent.instagram} target='_blank'><TwitterIcon /></a>) : (<></>)}
                                        {data.agent.instagram ? (<a href={data.agent.instagram} target='_blank'><LinkedInIcon /></a>) : (<></>)}
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', marginTop: '4px'}}>
                                    ({data.agent.rating || '5.0'})
                                    <Rating name="rating" value={data.agent.rating || 5.0} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                <h2 style={{ fontSize: '25px' }}>Bio</h2>
                                <p style={{ fontSize: '15px', maxWidth: '800px'}}>{data.agent.bio}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                <h2 style={{ fontSize: '30px' }}>Notable Acheivements</h2>
                                <p style={{ fontSize: '15px', maxWidth: '800px'}}>{data.agent.acheivements}</p>
                            </div>
                            </div>
                        </Grid>
                        <Grid item sm={10} md={10} xl={4} style={{ display: 'flex', justifyContent: 'center', }}>
                            <div>
                                <InlineWidget 
                                    url="https://calendly.com/jackyoukstetter1/test"
                                    pageSettings={{
                                        backgroundColor: 'ffffff',
                                        hideEventTypeDetails: false,
                                        hideLandingPageDetails: false,
                                        primaryColor: 'D5AD6D',
                                        textColor: 'black'
                                    }} 
                                    styles={{width: '90vw', height: '100vh', margin: '0', padding: '0'}}
                                />
                            </div>
                        </Grid>
                    </Grid>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Agent;