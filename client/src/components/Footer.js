import {Link} from 'react-router-dom'

const Footer = () => {

    return (
        <div style={{backgroundColor: 'black', color: 'white', width: '100%', height: '13vh', marginTop: '50vh', display: 'flex', justifyContent: 'right', alignItems: 'end'}}>
            <Link style={{color: 'white', margin: '10px', textDecoration: 'none'}} to='/'> © 2022. All rights reserved by Vive Ventures.</Link>
            <Link style={{color: 'white', margin: '10px'}} to='/privacy-policy'>Privacy Policy</Link>
            <Link style={{color: 'white', margin: '10px'}} to='/refund-policy'>Refund Policy</Link>
            <Link style={{color: 'white', margin: '10px'}} to='/admin'>Admin Portal</Link>
        </div>
    )
}

export default Footer;