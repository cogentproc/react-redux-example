import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import withStyles from '@material-ui/core/styles/withStyles';
//import loginPageStyle from 'assets/jss/material-dashboard-react/views/loginPageStyle.jsx';
import * as loginActions from 'actions/LoginActions';
import * as networkActions from 'actions/NetworkActions';
import LoginComp from './CLogin/LoginComp';

const Login = (props) => {
    const { classes } = props;
    const { login } = props;
    const { onLogin } = props.loginActions;
    const { getNetworkByAPIKey } = props.networkActions;

    useEffect(() => {
        var envApiKey = process.env.REACT_APP_API_KEY;
        if (envApiKey !== undefined) {
            getNetworkByAPIKey(envApiKey);
        }
    }, []);

    if (localStorage.getItem('token')) {
        return <Redirect to="/list" />;
    }
    /*

    if (login.chooseWorkflow) {
        return <Redirect to="/public/choose-workflow" />;
    }

    if (redirectToNetwork) {
        return <Redirect to="/public/network" />;
    }

    if (refreshLogin) {
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    if (showLoadingPage) {
        return (
            <div>Loading...</div>
        );
    }
    */
    return (
        <LoginComp
            workflow_id={"13"}
            network_name=""
            requesting={login.requesting}
            message={login.message}
            error_code={login.error_code}
            onLogin={onLogin}
            classes={props}
            loggedIn={login.loggedIn}
        />
    );
};

function mapStateToProps(state) {
    return {
        login: state.login,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
        networkActions: bindActionCreators(networkActions, dispatch),
    };
}

//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(loginPageStyle)(Login));
export default connect(mapStateToProps, mapDispatchToProps)(Login);
