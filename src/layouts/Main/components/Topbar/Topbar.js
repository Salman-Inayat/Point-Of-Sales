import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import LogoutButton from './LogoutButton'

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  fontSize2rem: {
    fontSize: '2rem'
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  logo: {
    color: 'white'
  },
  navbar: {
    backgroundColor: '#cc19ff'
  }
}));

const Topbar = props => {
  const { className, onSidebarOpen, ...rest } = props;

  const classes = useStyles();

  const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar className={clsx(classes.navbar)}>
        <RouterLink to="/" className={clsx(classes.logo, className)}>
          <h1>JehadiFYP.</h1>
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit" className={classes.fontSize2rem}>
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot">
              <NotificationsIcon fontSize="inherit" />
            </Badge>
          </IconButton>
          <IconButton 
            className={(classes.signOutButton, classes.fontSize2rem)}
            color="inherit">
            <InputIcon fontSize="inherit" />
          </IconButton>
          <LogoutButton/>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            className={classes.fontSize2rem}
            color="inherit"
            onClick={onSidebarOpen}>
            <MenuIcon fontSize="inherit" />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;