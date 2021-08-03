import { FormHandles } from '@unform/core';
import { useCallback, useImperativeHandle, useRef, useState, forwardRef } from 'react';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';

import { api } from '../../../../services/api';

import { AiOutlineClose } from 'react-icons/ai';

import LoadingGif from '.././../../../assets/images/loading.gif';

import { Button } from '../../../Button';
import { Input } from '../../../Input';
import { Modal } from '../../../Modal';

import { 
  PasswordModalTag 
} from './styles';
import { Error } from '../../../../styles/global';

export type ErrorType = {
  error_message: string;
  error_status: 'C06' | 'C07' | 'C02';
  status_code: number;
};

export type ModalHandlesPassword = {
  handleOpenChangePasswordModal: () => void;
};

const PasswordModal: React.ForwardRefRenderFunction<ModalHandlesPassword> = (props, ref) => {
  const changeFormPasswordRef = useRef<FormHandles>(null);

  // Partial password modal
  const [changePasswordLoader, setChangePasswordLoader] = useState(false);
  const [isError, setIsError] = useState({text: '', error: false});
  const [modalOpen, setOpenModal] = useState(false);
  
  const handleUpdatePassword = useCallback((data) => {
    setChangePasswordLoader(true);
    
    if(!data.new_password || !data.new_password_confirm || !data.current_password) {
      setIsError({text: 'Preencha todos os campos com pelo menos 1 caracter', error: true});
      setChangePasswordLoader(false);
      return;
    };

    setIsError({text: '', error: false});
    api.put('/user/changePassword', data).then(response => {
      setOpenModal(false);
      setIsError({text: '', error: false});
    }).catch((error: AxiosError) => {

      const errorType = {
        C07: 'new_password',
        C06: 'new_password_confirm',
        C02: 'current_password',
        default: 'Erro não esperado'
      };

      const errorData: ErrorType | undefined = error.response?.data;

      if(errorData !== undefined) {
        setIsError({text: '', error: false});
        if(errorData.error_status === 'C07') {
          changeFormPasswordRef.current?.setFieldError(errorType[(errorData).error_status] || errorType.default , 'Mínimo de 8 digitos para nova senha');
          return;
        }

        changeFormPasswordRef.current?.setFieldError(errorType[(errorData).error_status] || errorType.default , (errorData).error_message);
      };
    }).finally(() => {
      setChangePasswordLoader(false);
    });
  }, []);

  const handleOpenChangePasswordModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleOpenChangePasswordModal
    };
  });

  return (
    <Modal
      isOpen={modalOpen}
    >
      <PasswordModalTag>
        <header>
          <h2>MUDAR SENHA</h2>
          <button onClick={() => setOpenModal(false)}><AiOutlineClose /></button>
        </header>
        <Form ref={changeFormPasswordRef} onSubmit={handleUpdatePassword}>
          <Input name="current_password" isFieldset legendText="Senha atual" type="password"/>
          <Input name="new_password" isFieldset legendText="Nova senha" type="password"/>
          <Input name="new_password_confirm" isFieldset legendText="Confirme a nova senha" type="password"/>
          {isError.error && <Error>{isError.text}</Error>}
          <footer>
            <Button type="submit">{changePasswordLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
            <button type="button" onClick={() => setOpenModal(false)} className="buttonCancel">CANCELAR</button>
          </footer>
        </Form>
      </PasswordModalTag>
    </Modal>
  );
};

const PasswordModalF = forwardRef(PasswordModal);

export {PasswordModalF}