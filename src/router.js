import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import IndexPage from './views/IndexPage';
import DashBoard from './views/DashBoard';
import Login from './views/Login';
import ResetPass from './views/Login/resetPass';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <IndexPage>
        <Switch>
          <Route exact path="/page" component={DashBoard} />
          <Redirect exact from="/" to="/page" />
          <Route exact path="/login" component={Login} />
          <Route exact path="/resetpass" component={ResetPass} />
        </Switch>
      </IndexPage>
    </Router>
  );
}

export default RouterConfig;
