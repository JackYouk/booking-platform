import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from '../../utils/auth'

const ResponsiveAppBar = ({ headerSetting = {} }) => {

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
    <AppBar  style={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div style={{ textDecoration: 'none', color: 'white' }}>Vortex</div>
          </Link>

          {Auth.loggedIn() ? (
            <a onClick={() => Auth.logout()}>
              Logout
            </a>
          ) : (
            <div style={{ display: 'flex', }}>
              <Link to='/login' style={{ marginRight: '20px', color: 'white' }}>
                <div>Login</div>
              </Link>
              <Link to='/signup' style={{ color: 'white' }}>
                <div>Create an Account</div>
              </Link>
            </div>
          )}

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;