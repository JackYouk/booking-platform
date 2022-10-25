import * as React from 'react';
import { Button, CardActionArea, CardActions, Typography, CardMedia, Card, CardContent } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

import auth from '../utils/auth';

import blankprofile from '../images/blankprofile.png'


const AgentCard = (props) => {
    


    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    // height="140"
                    image={blankprofile}
                    alt="game img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.data.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {props.data.bio}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default AgentCard;