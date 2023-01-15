import { Button } from '@mui/material';
import {Link} from 'react-router-dom'

const Footer = () => {

    return (
        <div style={{backgroundColor: 'black', color: '', width: '100%',   display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
            <Link style={{color: 'white', margin: '10px', textDecoration: 'none'}} to='/'> © 2022. All rights reserved by Vive Ventures.</Link>
            <Link style={{color: '#D5AD6D', margin: '10px', textDecoration: 'none', color: 'black'}} to='/privacy-policy'><Button size='small' className='goldBg'>Privacy Policy</Button></Link>
            <Link style={{color: '#D5AD6D', margin: '10px', textDecoration: 'none', color: 'black'}} to='/refund-policy'><Button size='small' className='goldBg'>Refund Policy</Button></Link>
            <Link style={{color: '#D5AD6D', margin: '10px', textDecoration: 'none', color: 'black'}} to='/admin'><Button size='small' className='goldBg'>Admin Portal</Button></Link>
        </div>
    )
}

export default Footer;