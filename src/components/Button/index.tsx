import { ButtonHTMLAttributes, ReactNode } from 'react';

import { Container } from './styles';

type ButtonProps = ButtonHTMLAttributes<ButtonProps> & {
  children?: ReactNode;
  type?: string;
}

export function Button({children, type}: ButtonProps) {
  return (
    <Container>
      <button type={type}>{children}</button>
    </Container>
  );
}