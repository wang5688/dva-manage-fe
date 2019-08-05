import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Login from './views/Login';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" extra component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
