import { Form } from '@unform/web';
import { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { AxiosError } from 'axios';

import { useAuth } from '../../contexts/AuthContext';

import { LabelInput } from '../../styles/global';

import { Input } from '../../components/Input';

import logoAnimated from '../../assets/images/logoAnimated.gif';

import {
  Container,
  Content,
} from './styles';

export type ErrorType = {
  error_message: string;
  error_status: 'C01' | 'C02';
  status_code: number;
};

export function Login() {
  const { signinWithEmail } = useAuth();
  const loginFormRef = useRef<FormHandles>(null);

  const handleLoginForm = useCallback(async (data) => {
    loginFormRef.current?.setErrors({})
    signinWithEmail(data).then(response => {
    }).catch((error: AxiosError) => {
      const errorType = {
        C01: 'username',
        C02: 'password',
        default: 'Erro não esperado'
      };

      const errorData: ErrorType | undefined = error.response?.data

      if(errorData) {
        loginFormRef.current?.setFieldError(errorType[(errorData).error_status] || errorType.default , (errorData).error_message);
      }
    });
  }, [signinWithEmail]);

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
          <footer>
            <div>
              <LabelInput>
                <input name="toRemember" type="checkbox"/>
                <p className="checkmark"></p>
              </LabelInput>
              <p>Lembrar dados</p>
            </div>
            <button type="submit">Entrar</button>
          </footer>
        </Form>
      </Content>
    </Container>
  )
}