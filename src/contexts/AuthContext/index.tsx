import axios, { AxiosError } from 'axios';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';

type AuthState = {
  token: string;
  tokenIsValid: boolean;
};

type signinWithEmailCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signinWithEmail(credentials: signinWithEmailCredentials): Promise<void>;
  token: string;
  signOut(): void;
  tokenIsValid: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({children}: AuthProviderProps) {
  const history = useHistory();

  const [tokenIsValid, setTokenIsValid] = useState(true);

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@killerbee:token');
    api.defaults.headers.authorization = `Bearer ${token}`;

    if(token) {
      return {
        token,
        tokenIsValid
      };
    };

    return {} as AuthState;
  }); 

  const signOut = useCallback(() => {
    localStorage.removeItem('@killerbee:token');
    api.defaults.headers.authorization = ``;

    history.push('/');

    setData({} as AuthState);
  }, [history]);
  
  const signinWithEmail = useCallback(async ({username, password}: signinWithEmailCredentials) => {
    const response = await api.post('/authentication', {username, password});

    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    api.get('/user/valid').then(response => {
      setTokenIsValid(response.data);
    });

    localStorage.setItem('@killerbee:token', token);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('@killerbee:token');

    if(!token || !tokenIsValid) {
      signOut();
      return;
    }
    
    api.interceptors.response.use(undefined, (error) => {
      if(error.response.status === 401 || error.response.data.message === '401 Unauthorized') {
        window.location.reload();
        return false;
      };

      return Promise.reject(error);
    });

    api.get('/user/valid').then(response => {
      setTokenIsValid(response.data);
      if(response.data && response.data === false) {
        signOut();
      };
    });
    api.defaults.headers.authorization = `Bearer ${token}`;
  }, [history, signOut, tokenIsValid]);
  
  return (
    <AuthContext.Provider value={{token: data.token, signinWithEmail, tokenIsValid, signOut}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  };

  return context;
};