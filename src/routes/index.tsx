import { Switch } from 'react-router-dom';
import { ReloadConfigurationProvider } from '../contexts/ReloadConfigurationsContext';

import { GeneralSettings } from '../pages/GeneralSettings';
import {Login} from '../pages/Login';
import { RouterCustom } from './routerCustom';

export function Routes() {
  return (
    <Switch>
      <RouterCustom isAuthenticated path="/" exact component={Login} />
      <ReloadConfigurationProvider>
        <RouterCustom isPrivate path="/configuracoes" component={GeneralSettings} />
      </ReloadConfigurationProvider>
    </Switch>
  );
};