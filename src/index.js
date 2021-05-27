import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
  Router, Route, Switch, withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import indexRoutes from 'routes/index.jsx';
import configureStore from 'store/configureStore';

//import 'assets/scss/material-dashboard-pro-react.css?v=1.2.0';
import 'assetsnew/assets.css';

const hist = createBrowserHistory();

const App = () => {
  /*
  function getFaviconEl() {
    return document.getElementById('favicon');
  }
  useEffect(() => {
    var title = 'Meem Workflow';
    if (localStorage.getItem('network_title')) {
      title = localStorage.getItem('network_title');
    }
    document.title = title;

    if (localStorage.getItem('network_icon')) {
      var favicon = getFaviconEl();
      favicon.href = localStorage.getItem('network_icon');
    }
  }, []);
  */

  return (
    <Provider store={configureStore()}>
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => (
            <Route
              path={prop.path}
              component={withRouter(prop.component)}
              key={key}
            />
          ))}
        </Switch>
      </Router>
    </Provider>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
