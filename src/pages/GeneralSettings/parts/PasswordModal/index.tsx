import { FormHandles } from '@unform/core';
import { useRef } from 'react';
import { Form } from '@unform/web';

import { AiOutlineClose } from 'react-icons/ai';

import LoadingGif from '.././../../../assets/images/loading.gif';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';

import { 
  Error, 
  PasswordModalTag 
} from './styles';

type PasswordModalProps = {
  handleUpdatePassword(data: any): void;
  setModalPasswordIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalPasswordIsOpen: boolean;

  changePasswordError: string;
  changePasswordLoader: boolean;
};

export function PasswordModal({handleUpdatePassword, setModalPasswordIsOpen, modalPasswordIsOpen,changePasswordLoader,changePasswordError}: PasswordModalProps) {
  const changeFormPasswordRef = useRef<FormHandles>(null);

  return (
    <Modal
      isOpen={modalPasswordIsOpen}
    >
      <PasswordModalTag>
        <header>
          <h2>MUDAR SENHA</h2>
          <button onClick={() => setModalPasswordIsOpen(false)}><AiOutlineClose /></button>
        </header>
        <Form ref={changeFormPasswordRef} onSubmit={handleUpdatePassword}>
          <Input name="current_password" isFieldset legendText="Senha atual" type="password"/>
          <Input name="new_password" isFieldset legendText="Nova senha" type="password"/>
          <Input name="new_password_confirm" isFieldset legendText="Confirme a nova senha" type="password"/>
          {changePasswordError && <Error noPadding><p>{changePasswordError}</p></Error> }
          <footer>
            <Button type="submit">{changePasswordLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
            <button type="button" onClick={() => setModalPasswordIsOpen(false)} className="buttonCancel">CANCELAR</button>
          </footer>
        </Form>
      </PasswordModalTag>
    </Modal>
  );
}