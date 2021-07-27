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

    if(token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return {
        token,
        tokenIsValid
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

    setData({token, tokenIsValid});
  }, [history, tokenIsValid]);

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
      setTokenIsValid(response.data);
      if(response.data === false) {
        signOut();
      };
    });
    
  }, [history, signOut]);

  return (
    <AuthContext.Provider value={{token: data.token, tokenIsValid: data.tokenIsValid, signinWithEmail, signOut}}>
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