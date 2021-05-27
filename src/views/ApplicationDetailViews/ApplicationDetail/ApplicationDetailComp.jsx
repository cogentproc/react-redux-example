import React, { useState, useEffect, useReducer } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from 'components/CHeader/AppHeader.jsx';
import Footer from 'components/CFooter/Footer.jsx';
import applicationDetailRoutes from 'routes/app_detail';
import withStyles from '@material-ui/core/styles/withStyles';
import { makeStyles } from "@material-ui/core/styles";
import GridItem from 'components/Grid/GridItem.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import LeftSide from './LeftSide.jsx';
import RightSide from './RightSide.jsx';
import StepperUI from './StepperUI.jsx';

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

export default function AppDetail(props) {
    const classes = useStyles();

    /*
    const { getApplicationDetailForm, getApplication } = props;
    useEffect(() => {
        getApplicationDetailForm(props.application_id, props.role_id);
        getApplication(props.application_id);
    }, [getApplicationDetailForm, getApplication])
    */

    return (
        <div className={classes.wrapper}>
            <div className={classes.mainPanelUser}>
                <Header />
                <div className={classes.content}>
                    <GridContainer>
                        {/* LeftSide */}
                        <GridItem key="left" xs={12} sm={12} md={2} style={{ paddingLeft: '5px', paddingRight: '5px', display: 'block' }}>
                            <LeftSide
                                forms={props.application_detail_form.forms}
                                application={props.application}
                                application_detail={props.application_detail_form}
                            />

                        </GridItem>
                        {/* Middle Content */}
                        <GridItem key="middle" xs={12} sm={12} md={8}>
                            <StepperUI
                                forms={props.application_detail_form.forms}
                                application={props.application}
                            />
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
                        </GridItem>
                        {/* RightSide */}
                        <GridItem key="right" xs={12} sm={12} md={2} style={{ display: 'block' }}>
                            <RightSide
                                application={props.application}
                                application_detail={props.application_detail_form}
                            />
                        </GridItem>
                    </GridContainer>


                </div>
                <Footer />
            </div>
        </div>
    );
}
