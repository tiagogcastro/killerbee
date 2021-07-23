import { Form } from '@unform/web';
import { useCallback } from 'react';
import { Input } from '../../components/Input';
import {
  Container,
  Content
} from './styles';

import logoAnimated from '../../assets/images/logoAnimated.gif';
import { LabelInput } from '../../styles/global';

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