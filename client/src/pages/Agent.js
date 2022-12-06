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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '8vh' }}>
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div style={{display: 'flex', justifyContent: 'center', width: '100vw'}}>
                    <Grid container display='flex' justifyContent='center' style={{margin: '15px', width: '100vw'}}>
                        <Grid item sm={10} md={6}>
                            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={data.agent.imgPath} alt={'picture of ' + data.agent.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
                                    <h1 style={{ fontSize: '40px' }}>{data.agent.name}</h1>
                                    <h2 style={{ fontSize: '20px' }}>Industries</h2>
                                    <div>
                                        <InstagramIcon />
                                        <TwitterIcon />
                                        <LinkedInIcon />
                                    </div>
                                    <div style={{display: 'flex', alignItems: 'center', marginTop: '4px'}}>
                                    (5.0)
                                    <Rating name="rating" value={5} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                <h2 style={{ fontSize: '30px' }}>Bio</h2>
                                <p style={{ fontSize: '15px', maxWidth: '800px'}}>Verse 1: E-40
                                    'Member that game Fat Bank Take Skinny Bank?
                                    Well now we play Skinny Bank Take Fat Bank
                                    That's because it ain't no work bein' offered main
                                    They act like they ain't even thinkin' 'bout us main
                                    I promise I swear the po-po threw my homie in the slammer
                                    Did him bad, wish I had my candid camera, made me mad
                                    Penelopes swarmin' like bees, surveillance binoculars hidden in trees
                                    Reliable sources copping pleas, oh p-uh-please
                                    One for the life, and two for death
                                    Three damn strikes no chances left
                                    Let me tell ya lil 'bout me, E-40 and the C-L-I-C
                                    We used to have to use sheets for curtains, socks for washtowels
                                    I was happy as hell when my cousin gave me his hand-me-downs
                                    This ain't no happy Shirley Temple tale-listic crap
                                    This here is serious, more realistic than Radio Shack
                                    Observe as I strike a nerve, reach out and touch my kind
                                    Open up your photo album, man, and I bet you find
                                    Folks that passed away, potnas that been blasted away
                                    I miss you, spill some liquor, mayne, who got some tissue?</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                <h2 style={{ fontSize: '30px' }}>Notable Acheivements</h2>
                                <p style={{ fontSize: '15px', maxWidth: '800px'}}>Verse 1: E-40
                                    'Member that game Fat Bank Take Skinny Bank?
                                    Well now we play Skinny Bank Take Fat Bank
                                    That's because it ain't no work bein' offered main
                                    They act like they ain't even thinkin' 'bout us main
                                    I promise I swear the po-po threw my homie in the slammer
                                    Did him bad, wish I had my candid camera, made me mad</p>
                            </div>
                            </div>
                        </Grid>
                        <Grid item sm={10} md={4} style={{ display: 'flex', justifyContent: 'center', width: '50vw'}}>
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
                                      styles={{width: '100vw', height: '100vh'}}
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