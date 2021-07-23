import { ReactNode } from 'react';

import { Container } from './styles';

type ButtonProps = {
  children?: ReactNode;
}

export function Button({children}: ButtonProps) {
  return (
    <Container>
      <button>{children}</button>
    </Container>
  );
}