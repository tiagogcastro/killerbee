import { Switch } from 'react-router-dom';

import { GeneralSettings } from '../pages/GeneralSettings';
import {Login} from '../pages/Login';
import { RouterCustom } from './routerCustom';

export function Routes() {
  return (
    <Switch>
      <RouterCustom isAuthenticated path="/" exact component={Login} />
      <RouterCustom isPrivate path="/configuracoes" component={GeneralSettings} />
    </Switch>
  );
};