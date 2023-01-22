import * as React from 'react';
import { CardActionArea, Box, Typography, CardMedia, Card, CardContent, Button, Chip } from '@mui/material';
import blankprofile from '../images/blankprofile.png'
import { Link } from 'react-router-dom';
import vortexlogo from './vortexlogo.png'

const AgentCard = (props) => {
    return (
        <Link to={'/agent/' + props.data._id} style={{textDecoration: 'none', backgroundColor: 'white', justifyContent: 'center', display: 'flex'}}>
            {/* <div
                className='agentcard'
                style={{
                    position: 'relative',
                    backgroundImage: `url(${props.data.imgPath})`,
                    backgroundSize: 'cover',
                }}
            >
                <div 
                    // className='obsBg'
                    style={{
                        position: 'absolute', 
                        bottom: '0', 
                        left: '0',
                        borderRadius: '5px',
                        width: '100%'
                    }}
                >
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <div style={{color: 'white', fontSize: '25px', fontWeight: 'bold', fontFamily: 'inherit'}}>{props.data.name}</div>
                        <div style={{color: 'white', fontSize: '12px', fontWeight: 'bold', fontFamily: 'inherit'}}>{props.data.industries}</div>
                        <div style={{maxWidth: '110px'}}>
                            {props.data.expertIn.map((tag) => {
                                return (
                                    <Chip label={tag.type} variant="outlined" size='small' color='primary' style={{margin: '2px', color: 'black'}} />
                                );
                            })}
                        </div>
                    </div>   
                </div>
            </div> */}
            <div className='card' style={{
                    backgroundImage: `url(${props.data.imgPath})`,
                    backgroundSize: 'cover',
                }}>
                    <div className='text'>
                        {props.data.name}
                        <div className='subtitle'>{props.data.industries}</div>
                    </div>
                </div>
        
        </Link>
        
    );
}

export default AgentCard;