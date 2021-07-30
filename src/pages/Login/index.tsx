import { useHistory } from 'react-router-dom';import { Form } from '@unform/web';
import { useCallback, useRef, useEffect, useState } from 'react';
import { FormHandles } from '@unform/core';
import { AxiosError } from 'axios';

import { useAuth } from '../../contexts/AuthContext';

import { LabelInput } from '../../styles/global';

import { Input } from '../../components/Input';

import {
  Container,
  Content,
} from './styles';

import logoAnimated from '../../assets/images/logoAnimated.gif';
import LoadingGif from '.././../assets/images/loading.gif';

export type ErrorType = {
  error_message: string;
  error_status: 'C01' | 'C02';
  status_code: number;
};

export function Login() {
  const { signinWithEmail, tokenIsValid } = useAuth();
  const history = useHistory();
  const [loginLoader, setLoginLoader] = useState(false);
  const [error, setError] = useState('');

  const loginFormRef = useRef<FormHandles>(null);

  const handleLoginForm = useCallback(async (data) => {
    setLoginLoader(true);
    if(data.username.length < 1 || data.password.length < 1) {
      setLoginLoader(false);
      setError('Preencha os campos com pelo menos 1 caracter')
      return;
    } else {
      loginFormRef.current?.setErrors({})
      
      signinWithEmail(data).then(response => {
        history.push('/configuracoes');
      }).catch((error: AxiosError) => {
        const errorType = {
          C01: 'username',
          C02: 'password',
          default: 'Erro não esperado'
        };

        const errorData: ErrorType | undefined = error.response?.data

        if(errorData) {
          loginFormRef.current?.setFieldError(errorType[(errorData).error_status] || errorType.default , (errorData).error_message);
          setError('');
        }
      }).finally(() => {
        setLoginLoader(false);
        setError('');
      });
    }

  }, [signinWithEmail, history]);

  useEffect(() => {
    if(tokenIsValid) {
      history.push('/configuracoes');
    };
    return () => {}
  }, [history, tokenIsValid])

  return (
    <Container>
      <Content>
        <img src={logoAnimated} alt="Gif animado" />
        <Form ref={loginFormRef} onSubmit={handleLoginForm}>
          <Input 
            name="username" 
            isFieldset 
            legendText="Email" 
            type="email"
          />
          <Input name="password" isPassword placeholder="Senha" legendText="Senha" type="password"/>
          {error && <p className="error">{error}</p>}
          <footer>
            <div>
              <LabelInput>
                <input name="toRemember" type="checkbox"/>
                <p className="checkmark"></p>
              </LabelInput>
              <p>Lembrar dados</p>
            </div>
            <button type="submit">{loginLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'ENTRAR'}</button>
          </footer>
        </Form>
      </Content>
    </Container>
  )
}