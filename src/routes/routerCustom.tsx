import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

type RouterCustomProps = RouteProps & {
  isPrivate?: boolean;
  isAuthenticated?: boolean;
};

export function RouterCustom({isPrivate, isAuthenticated, ...rest}: RouterCustomProps) {
  const {token, tokenIsValid} = useAuth();

  if(isPrivate && (!token || !tokenIsValid)) {
    return <Redirect to="/"/>;
  };

  return (
    <Route {...rest} />
  )
}