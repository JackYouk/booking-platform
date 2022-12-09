import { useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_AGENT } from "../utils/queries";
import { CircularProgress, Box, Button, Rating, Grid, TextField } from "@mui/material";
import ResponsiveAppBar from "../components/navbar/NavBar";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from "react";


import { InlineWidget } from "react-calendly";
import { ADD_REVIEW } from "../utils/mutations";


const Agent = () => {
    const paramId = useParams()['*'];

    const { loading, data, refetch } = useQuery(QUERY_AGENT, {
        variables: { agentId: paramId },
    });

    const [showAddReview, setShowAddReview] = useState(false);

    const [addReviewFormState, setAddReviewFormState] = useState({
        username: '',
        review: '',
        rating: 5.0,
    });

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;

        setAddReviewFormState({
            ...addReviewFormState,
            [key]: value,
        });
    };

    const [addReview] = useMutation(ADD_REVIEW, {
        variables: {
            agentId: paramId,
            username: addReviewFormState.username,
            review: addReviewFormState.review,
            rating: addReviewFormState.rating.toString(),
        }
    });

    const submitReview = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addReview({
                agentId: paramId,
                username: addReviewFormState.username,
                review: addReviewFormState.review,
                rating: addReviewFormState.rating.toString(),
            });
            refetch();
            setShowAddReview(false);
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{ maxWidth: '100vw', }}>
            <ResponsiveAppBar />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '8vh' }}>
                {loading ? (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100vw' }}>
                        <Grid container display='flex' justifyContent='center' style={{ width: '100vw' }}>
                            <Grid item sm={10} md={10} xl={6}>
                                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '50px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', width: '100vw' }}>
                                        <img src={data.agent.imgPath} alt={'picture of ' + data.agent.name} style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
                                        <div style={{ margin: '20px', display: 'flex', flexDirection: 'column' }}>
                                            <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>{data.agent.name}</h1>
                                            <h2 style={{ fontSize: '20px' }}>{data.agent.industries}</h2>
                                            <div>
                                                {data.agent.instagram ? (<a href={data.agent.instagram} style={{ color: '#D5AD6D' }} target='_blank'><InstagramIcon /></a>) : (<></>)}
                                                {data.agent.instagram ? (<a href={data.agent.instagram} style={{ color: '#D5AD6D' }} target='_blank'><TwitterIcon /></a>) : (<></>)}
                                                {data.agent.instagram ? (<a href={data.agent.instagram} style={{ color: '#D5AD6D' }} target='_blank'><LinkedInIcon /></a>) : (<></>)}
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', marginTop: '4px' }}>
                                                ({data.agent.rating || '5.0'})
                                                <Rating name="rating" value={Number(data.agent.rating) || 5.0} readOnly />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                        <h2 style={{ fontSize: '25px' }}>Bio</h2>
                                        <p style={{ fontSize: '15px', maxWidth: '800px' }}>{data.agent.bio}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                        <h2 style={{ fontSize: '25px' }}>Acheivements</h2>
                                        <p style={{ fontSize: '15px', maxWidth: '800px' }}>{data.agent.acheivements}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
                                        <h2 style={{ fontSize: '25px' }}>Reviews</h2>
                                        {data.agent.reviews.map(review => {
                                            return (
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>
                                                    <p style={{ fontSize: '15px', marginRight: '1px' }}><span style={{ fontWeight: 'bold' }}>{review.username}:</span> {review.review}</p>
                                                    {review.rating ? (<Rating name="review rating" value={Number(review.rating) || 5.0} readOnly />) : (<></>)}
                                                </div>
                                            )
                                        })}
                                        {
                                            showAddReview ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', }}>
                                                    <TextField
                                                        sx={{ width: '230px', marginBottom: '5px' }}
                                                        label="Name"
                                                        name="username"
                                                        type='text'
                                                        onChange={handleChange}
                                                        variant="standard"
                                                        size="small"
                                                    />
                                                    <TextField
                                                        sx={{ width: '230px', marginBottom: '10px', }}
                                                        label="Review"
                                                        name="review"
                                                        type='text'
                                                        onChange={handleChange}
                                                        variant="standard"
                                                        size="small"
                                                        multiline
                                                        maxRows={4}
                                                    />
                                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <Rating name="rating" onChange={handleChange} sx={{ marginRight: '10px' }} value={addReviewFormState.rating} />
                                                        <Button variant="outlined" sx={{ width: '100px', }} onClick={submitReview}>Add</Button>
                                                    </div>

                                                </div>
                                            ) : (
                                                <a style={{color: '#D5AD6D', fontStyle: 'italic', textDecoration: 'underline', cursor: 'pointer'}} onClick={() => setShowAddReview(true)}>Add a review</a>
                                            )
                                        }
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
                                        styles={{ width: '90vw', height: '100vh', margin: '0', padding: '0' }}
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