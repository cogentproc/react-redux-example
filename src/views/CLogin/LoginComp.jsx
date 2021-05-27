import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import Email from '@material-ui/icons/Email';
import LockOutline from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { validateEmail } from 'Api/common.js'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    inputAdornmentIcon: {
        color: '#555',
    },
}));

export default function LoginComp(props) {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const classes = useStyles();
    useEffect(() => {
        setMessage(props.message);

        if (props.error_code === '1004' || props.error_code === '1005') {
            setEmailError(false);
            setPasswordError(false);
        }
        if (props.error_code === '1006') {
            setEmailError(true);
            setPasswordError(true);
        }
        if (props.error_code === '1091') {
            setEmailError(true);
            setPasswordError(false);
        }
        if (props.error_code === '1092') {
            setEmailError(false);
            setPasswordError(true);
        }
        if (props.error_code === '1093' || props.error_code === '1115') {
            setEmailError(false);
            setPasswordError(true);
        }
        if (props.error_code === '1114') {
            setEmailError(true);
            setPasswordError(false);
        }
        if (props.error_code === '') {
            setEmailError(false);
            setPasswordError(false);
        }
    }, [props]);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const onRegisterClick = (e) => {
        window.location.href = '/public/register';
    };
    const onForgotPasswordClick = (e) => {
        window.location.href = '/public/forgot-password';
    };
    const onLoginClick = (e) => {
        if (password === '' && email === '') {
            setMessage('Invalid Email and Password');
            return;
        }

        if (email === '' || validateEmail(email)) {
            setMessage('Invalid Email');
            return;
        }
        if (password === '') {
            setMessage('Invalid Password');
            return;
        }
        props.onLogin({
            email,
            workflow_id: props.workflow_id,
            password,
        }, props.redirect);
    };

    return (
        <div className={classes.paper}>
            {/*<form className={classes.form} noValidate>*/}
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputProps={{
                    onChange: onEmailChange.bind(this),
                    error: emailError,
                    endAdornment: (
                        <InputAdornment position="end">
                            <Email className={classes.inputAdornmentIcon} />
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                formControlProps={{
                    fullWidth: true,
                }}
                inputProps={{
                    input_type: 'password',
                    error: passwordError,
                    onChange: onPasswordChange.bind(this),
                    endAdornment: (
                        <InputAdornment position="end">
                            <LockOutline
                                className={classes.inputAdornmentIcon}
                            />
                        </InputAdornment>
                    ),
                }}
            />
            {/*
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                */}
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onLoginClick.bind(this)}
            >
                Log In
                </Button>
            {/*
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
                */}
            {/*</form>*/}
        </div>
    );
}
