import * as React from 'react';
import { CardActionArea, Box, Typography, CardMedia, Card, CardContent, Button, Chip } from '@mui/material';
import blankprofile from '../images/blankprofile.png'
import { Link } from 'react-router-dom';

const AgentCard = (props) => {
    return (
        <Link to={'/agent/' + props.data._id} style={{textDecoration: 'none', }}>
            <Card sx={{ display: 'flex' }}>
                <CardMedia
                    component="img"
                    sx={{ width: 151, backgroundColor: 'black' }}
                    image={props.data.imgPath}
                    alt=""
                />
                <Box className='goldBg' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: '300px', minHeight: '200px', }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h5" fontWeight='bold'>
                        {props.data.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div" fontWeight='bold'>
                        {props.data.industries}
                    </Typography>
                    <div style={{maxWidth: '180px'}}>
                        {props.data.expertIn.map((tag) => {
                            return (
                                <Chip label={tag.type} variant="outlined" size='small' color='primary' style={{margin: '2px', color: 'black'}} />
                            );
                        })}
                    </div>
                    </CardContent>
                </Box> 
            </Card>
            {/* <Card sx={{ width: 169}}>
                <CardActionArea >
                    <CardMedia height='169px'>
                        <img src={props.data.imgPath} alt='agent image' style={{height: '169px'}} />
                    </CardMedia>
                    <CardContent style={{ backgroundColor: 'inherit', color: '#D5AD6D'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            
                        </Typography>
                        <Typography sx={{ mb: 1.5, }} >
                            {props.data.industries}
                        </Typography>
                        {props.data.expertIn.map((tag) => {
                            return (
                                <Chip label={tag.type} variant="outlined" size='small' color='secondary' style={{marginBottom: '4px', color: '#D5AD6D'}} />
                                // <button>{tag.type}</button>
                            );
                        })}
                    </CardContent>
                </CardActionArea>
            </Card> */}
        </Link>
    );
}

export default AgentCard;