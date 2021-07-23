import { Route, Switch } from 'react-router-dom';

import { GeneralSettings } from '../pages/GeneralSettings';
import {Login} from '../pages/Login';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/configuracoes" component={GeneralSettings} />
    </Switch>
  );
};