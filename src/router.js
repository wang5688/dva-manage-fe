import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import App from './views/App';
import IndexPage from './views/IndexPage';
import Login from './views/Login';
import ResetPass from './views/Login/resetPass';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route exact path="/page" component={IndexPage} />
          <Redirect exact from="/" to="/page" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpass" component={ResetPass} />
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
