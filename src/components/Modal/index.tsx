import React, { ReactNode } from 'react';
import {
  Container,
  Content
} from './styles';

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
}

export function Modal({children, isOpen}: ModalProps) {
  return (
    <>
      {isOpen && (
      <Container>
        <Content>
          {children}
        </Content>
      </Container>
      )}
    </>
  );
}