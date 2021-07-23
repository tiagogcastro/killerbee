import { Route, Switch } from 'react-router-dom';

import {Login} from '../pages/Login';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
    </Switch>
  );
};