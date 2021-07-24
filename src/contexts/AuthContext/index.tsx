import { AxiosError } from 'axios';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../../services/api';

interface AuthState {
  token: string;
}

type signinWithEmailCredentials = {
  username: string;
  password: string;
}

type AuthContextData = {
  signinWithEmail(credentials: signinWithEmailCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
  const history = useHistory();

  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@killerbee:token');

    if(token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
      };
    }

    return {} as AuthState;
  }); 

  const signinWithEmail = useCallback(async ({username, password}: signinWithEmailCredentials) => {
    const response = await api.post('/authentication', {username, password});

    const { token } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    localStorage.setItem('@killerbee:token', token);

    history.push('/configuracoes');

    setData({token});
  }, []);

  useEffect(() => {
    api.interceptors.response.use((response) => response, async (error: AxiosError) => {
      if(error.response?.status === 401) {
        history.push('/');
        return;
      };
    });
  }, [history]);

  return (
    <AuthContext.Provider value={{signinWithEmail}}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if(!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};