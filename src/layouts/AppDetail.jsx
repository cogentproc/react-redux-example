import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from 'components/CHeader/AppHeader.jsx';
import Footer from 'components/CFooter/Footer.jsx';
import applicationDetailRoutes from 'routes/app_detail';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        position: 'relative',
        top: '0',
        height: '100vh',
    },
    mainPanelUser: {
        [theme.breakpoints.up('md')]: {
            width: 'calc(100%)',
        },
        overflow: 'auto',
        position: 'relative',
        float: 'right',
        //...transition,
        maxHeight: '100%',
        width: '100%',
        overflowScrolling: 'touch',
    },
    content: {
        marginTop: '10px',
        padding: '10px',
        minHeight: 'calc(100vh - 123px)',
    },
}));


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

export default function AppDetail() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.mainPanelUser}>
                <Header />
                <div className={classes.content}>
                    <Switch>
                        {applicationDetailRoutes.map((prop, key) => {
                            if (prop.redirect)
                                return (
                                    <Redirect from={prop.path} to={prop.to} key={key} />
                                );
                            return (
                                <AuthenticatedRoute
                                    path={prop.path}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}
                    </Switch>
                </div>
                <Footer />
            </div>
        </div>
    );
}
