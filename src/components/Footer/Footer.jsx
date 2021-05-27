// import React from "react";
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
// core components
import footerStyle from 'assets/jss/material-dashboard-react/components/footerStyle.jsx';
import { onRefresh } from 'actions/LoginActions';

function Footer({ ...props }) {
  const { classes } = props;
  const linkAdmin = '/admin/';
  const linkUser = '/';
  const linkNetworkAdmin = '/networkadmin'
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <Link to={linkNetworkAdmin}>NetworkAdmin</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to={linkAdmin}>Admin</Link>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <Link to={linkUser}>User</Link>
            </ListItem>
            {/*
            <ListItem className={classes.inlineBlock}>
              <a href="#blog" className={classes.block}>
                Blog
              </a>
            </ListItem>
            */}
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy;
            {' '}
            {1900 + new Date().getYear()}
            {' '}
            <a target='_blank' rel="noreferrer" href={process.env.REACT_APP_COMP_LINK} className={classes.a} >
              {process.env.REACT_APP_COMP_NAME}
            </a>
          </span>
        </p>
        <p>
          <IntervalRefresh />
        </p>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(footerStyle)(Footer);

const IntervalRefresh = () => {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  var loginTime = parseInt(localStorage.getItem('login_time'), 10);
  var unixTime = Math.floor(Date.now() / 1000);
  // eslint-disable-next-line use-isnan
  if (loginTime != NaN) {
    if (unixTime > (loginTime + 3595)) {
      localStorage.setItem('login_time', null);
      onRefresh();
    }
  }
  return (<div />);
};
