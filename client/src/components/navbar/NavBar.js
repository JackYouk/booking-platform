import * as React from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { Image } from 'mui-image';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Auth from '../../utils/auth'

const ResponsiveAppBar = ({ headerSetting = {} }) => {

  return (
    <AppBar  style={{ backgroundColor: 'black' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <div style={{ textDecoration: 'none', color: '#D5AD6D' }}>Vortex</div>
          </Link>

          {Auth.loggedIn() ? (
            <a style={{cursor: 'pointer'}} onClick={() => Auth.logout()}>
              Logout
            </a>
          ) : (
            <div style={{ display: 'flex', }}>
              <Link to='/login' style={{ marginRight: '20px', color: '#D5AD6D' }}>
                <div>Login</div>
              </Link>
              <Link to='/signup' style={{ color: '#D5AD6D' }}>
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