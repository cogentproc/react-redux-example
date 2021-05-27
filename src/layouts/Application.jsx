/* eslint-disable react/jsx-props-no-spreading */
import React /* ,{useState, useEffect } */ from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
// import { makeStyles } from "@material-ui/core/styles";
import AppHeader from 'components/Header/AppHeader.jsx';
import Footer from 'components/Footer/Footer';
import applicationRoutes from 'routes/application';
import appDashboardStyle from 'assets/jss/material-dashboard-react/layouts/appDashboardStyle.jsx';
import PropTypes from 'prop-types';

function AuthenticatedRoute({ component: Comp, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => (localStorage.getItem('token')
        ? <Comp {...props} />
        : (
          <Redirect
            to="/public/login"
          />
        ))}
    />
  );
}
// let ps;

// const useStyles = makeStyles(appDashboardStyle)

function Application({ ...props }) {
  const mainPanelUser = React.createRef();
  const { classes } = props;
  return (
    <div className={classes.wrapper}>
      <div className={classes.mainPanelUser} ref={mainPanelUser}>
        <AppHeader />
        <div className={classes.content}>
          {/* <div className={classes.container}> */}
          <Switch>
            {applicationRoutes.map((prop, key) => {
              if (prop.redirect) return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <AuthenticatedRoute
                  path={prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          {/* </div> */}
        </div>
        <Footer />
      </div>
    </div>
  );
}

Application.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(appDashboardStyle)(Application);
