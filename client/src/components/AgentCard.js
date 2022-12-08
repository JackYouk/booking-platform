import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, CardContent, Button, Chip } from '@mui/material';
import blankprofile from '../images/blankprofile.png'
import { Link } from 'react-router-dom';


const AgentCard = (props) => {
    return (
        <Link to={'/agent/' + props.data._id} style={{textDecoration: 'none', }}>
            <Card sx={{ width: 169}}>
                <CardActionArea >
                    <CardMedia height='169px'>
                        <img src={props.data.imgPath} alt='agent image' style={{height: '169px'}} />
                    </CardMedia>
                    <CardContent style={{minHeight: '169px', backgroundColor: 'black', color: '#D5AD6D'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.data.name}
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
            </Card>
        </Link>
    );
}

export default AgentCard;