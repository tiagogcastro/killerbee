import { AxiosError } from 'axios';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';

type AuthState = {
  token: string;
};

type signinWithEmailCredentials = {
  username: string;
  password: string;
};

type AuthContextData = {
  signinWithEmail(credentials: signinWithEmailCredentials): Promise<void>;
  token: string;
  signOut(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({children}: AuthProviderProps) {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@killerbee:token');

    if(token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
      };
    };

    return {} as AuthState;
  }); 

  const signinWithEmail = useCallback(async ({username, password}: signinWithEmailCredentials) => {
    const response = await api.post('/authentication', {username, password});

    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@killerbee:token', token);

    history.push('/configuracoes');

    setData({token});
  }, [history]);

  const signOut = useCallback(() => {
    localStorage.removeItem('@killerbee:token');

    history.push('/');

    return {} as AuthState;
  }, [history]);

  useEffect(() => {
    const token = localStorage.getItem('@killerbee:token');

    if(!token) {
      signOut();
      return;
    };

    api.get('/user/valid').then(response => {
      if(response.data === false) {
        signOut();
      };
    });
    
  }, [history, signOut]);

  return (
    <AuthContext.Provider value={{token: data.token, signinWithEmail, signOut}}>
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