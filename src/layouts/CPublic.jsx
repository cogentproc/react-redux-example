import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Header from 'components/CHeader/Header.jsx';
import Footer from 'components/CFooter/Footer.jsx';
import pagesRoutes from 'routes/public';

export default function Public() {
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Header />
            <Switch>
                {pagesRoutes.map((prop, key) => {
                    if (prop.collapse) {
                        return null;
                    }
                    if (prop.redirect) {
                        return (
                            <Redirect from={prop.path} to={prop.to} key={key} />
                        );
                    }
                    return (
                        <Route
                            path={prop.path}
                            component={prop.component}
                            key={key}
                        />
                    );
                })}
            </Switch>
            <Footer />
        </Container>
    );
}
