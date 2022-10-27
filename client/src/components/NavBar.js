import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to='/'><div style={{textDecoration: 'none', color: 'white'}}>Vive</div></Link>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ display: { xs: { p: 0 }, md: { pl: 15 } } }}>
                <Avatar alt="Profile" />
              </IconButton>
            </Tooltip>

              {Auth.loggedIn() ? (
                <Menu
                  sx={{ mt: '45px' }}
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
                  <MenuItem>
                    <Link to="/profile">  <Typography textAlign="center">Profile</Typography> </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/createAgent">  <Typography textAlign="center">Create Agent</Typography> </Link>
                  </MenuItem>

                  <MenuItem onClick={() => Auth.logout()}>
                    <Typography textAlign="center">Log Out</Typography>
                  </MenuItem>
                </Menu>
              ) : (
                <Menu
                  sx={{ mt: '45px' }}
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
                  <MenuItem>
                    <Link to="/login">  <Typography textAlign="center">Login</Typography> </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/signup">  <Typography textAlign="center">Signup</Typography> </Link>
                  </MenuItem>
                </Menu>
              )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;