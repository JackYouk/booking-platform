import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, CardContent, Button, Chip } from '@mui/material';
import blankprofile from '../images/blankprofile.png'
import { Link } from 'react-router-dom';


const AgentCard = (props) => {
    console.log(props.data.imgPath)
    return (
        <Link to={'/agent/' + props.data._id} style={{textDecoration: 'none', }}>
            <Card sx={{ maxWidth: 200, minHeight: 400}}>
                <CardActionArea >
                    <CardMedia height='200px'>
                        <img src={props.data.imgPath} alt='agent image' style={{height: '300px'}} />
                    </CardMedia>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            {props.data.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {props.data.bio}
                        </Typography>
                        {props.data.expertIn.map((tag) => {
                            return (
                                <Chip label={tag.type} variant="outlined" size='small' style={{marginRight: '3px'}} />
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