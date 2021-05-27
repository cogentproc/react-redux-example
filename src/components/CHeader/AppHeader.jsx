import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from '@material-ui/icons/SettingsPower';
import SubHeader from './SubHeader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

}));

export default function AppHeader() {
  const classes = useStyles();

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div>
      <AppBar position="relative">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="subtitle1" className={classes.title}>
            {localStorage.getItem('network_title')}
            <br />
            {localStorage.getItem('workflow_name')}
          </Typography>
          <Typography variant="caption" className={classes.menuButton}>
            {localStorage.getItem('name')}
            <br />
            {localStorage.getItem('email')}
          </Typography>
          <IconButton edge="start" onClick={handleLogout} className={classes.menuButton} color="inherit" aria-label="menu" title="Logout">
            <Logout style={{ color: '#e30c00', paddingLeft: '1px' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <SubHeader key="subHeader" />
    </div>
  );
}