import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, CardContent, Button } from '@mui/material';
import blankprofile from '../images/blankprofile.png'
import { Link } from 'react-router-dom';


const AgentCard = (props) => {
    console.log(props.data.imgPath)
    return (
        <Link to={'/agent/' + props.data._id}>
            <Card sx={{ maxWidth: 200 }}>
                <CardActionArea>
                    <CardMedia
                        height='200px'
                    >
                        <img src={props.data.imgPath} alt='agent image' style={{height: '300px'}} />
                    </CardMedia>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.data.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.data.bio}
                        </Typography>
                        {props.data.expertIn.map((tag) => {
                            return (
                                <button>{tag.type}</button>
                            );
                        })}
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

export default AgentCard;