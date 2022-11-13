import * as React from 'react';
import { CardActionArea, Typography, CardMedia, Card, CardContent, Button, Chip } from '@mui/material';
import blankprofile from '../images/blankprofile.png'
import { Link } from 'react-router-dom';


const AgentCard = (props) => {
    console.log(props.data.imgPath)
    return (
        <Link to={'/agent/' + props.data._id} style={{textDecoration: 'none', }}>
            <Card sx={{ width: 200}}>
                <CardActionArea >
                    <CardMedia height='200px'>
                        <img src={props.data.imgPath} alt='agent image' style={{height: '160px'}} />
                    </CardMedia>
                    <CardContent style={{minHeight: '160px', backgroundColor: 'black', color: 'white'}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {props.data.name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} >
                            {props.data.bio}
                        </Typography>
                        {props.data.expertIn.map((tag) => {
                            return (
                                <Chip label={tag.type} variant="outlined" size='small' style={{marginRight: '3px', color: 'white'}} />
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