import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import App from './views/App';
import IndexPage from './views/IndexPage';
import DashBoard from './components/DashBoard';
import Login from './views/Login';
import ResetPass from './views/Login/resetPass';
import Account from './views/Account';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <App>
        <Switch>
          <DashBoard path="/page">
            <Route exact path="/page" component={IndexPage} />
            <Route exact path="/page/account" component={Account} />
          </DashBoard>
          <Redirect exact from="/" to="/page" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpass" component={ResetPass} />
        </Switch>
      </App>
    </Router>
  );
}

export default RouterConfig;
