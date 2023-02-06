import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import blankprofile from '../../images/blankprofile.png'
import AuthService from '../../utils/auth.js'
import { Link } from 'react-router-dom';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function AccountNav() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} >
          <Avatar sx={{ p: 1, width: '6vh', height: '6vh', backgroundColor: 'black' }} ><img style={{ width: '6vh' }} src={blankprofile} /></Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '8vh' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

        {AuthService.loggedIn() ? (
          <>
            <MenuItem onClick={() => {
              handleCloseUserMenu()
              AuthService.logout()
            }}>
              <Typography textAlign="center">Signout</Typography>
            </MenuItem>
            <Link to='/admin'>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">admin portal</Typography>
              </MenuItem>
            </Link>
          </>
        ) : (
          <Link to='/login'>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">Login</Typography>
            </MenuItem>
          </Link>
        )}
      </Menu>
    </Box>
  );
}
export default AccountNav;