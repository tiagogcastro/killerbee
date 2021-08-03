import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';

type RouterCustomProps = RouteProps & {
  isPrivate?: boolean;
  isAuthenticated?: boolean;
};

export function RouterCustom({isPrivate, isAuthenticated, ...rest}: RouterCustomProps) {
  const { token, tokenIsValid} = useAuth();

  if(isPrivate && !(tokenIsValid || token)) {
    return <Redirect to="/"/>;
  };

  return (
    <Route {...rest} />
  )
}