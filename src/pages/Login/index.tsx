import { Form } from '@unform/web';
import { useCallback } from 'react';
import { Input } from '../../components/Input';
import {
  Container,
  Content
} from './styles';

import logoAnimated from '../../assets/images/logoAnimated.gif';

export function Login() {

  const handleLoginForm = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Content>
        <img src={logoAnimated} alt="Gif animado" />
        <Form onSubmit={handleLoginForm}>
          <Input name="email" isFieldset legendText="Email" type="email"/>
          <Input name="password" isPassword placeholder="Senha" legendText="Senha" type="password"/>
          <footer>
            <div>
              <Input name="toRemember" isFieldset={false} type="checkbox"/>
              <label>Lembrar dados</label>
            </div>
            <button type="submit">Entrar</button>
          </footer>
        </Form>
      </Content>
    </Container>
  )
}