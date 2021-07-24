import { Form } from '@unform/web';
import { useCallback, useState } from 'react';

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsArrowLeftShort, BsTrashFill } from 'react-icons/bs';
import {FaEllipsisV} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';

import { LabelInput } from '../../styles/global';

import {
  Container,
  Content,
  Categories,
  Category,
  PasswordModal,
} from './styles';

export function GeneralSettings() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleUpdateSettings = useCallback((data) => {
    console.log(data);
  }, []);

  const handleUpdatePassword = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        <Form onSubmit={handleUpdateSettings}>
        <main>
          <header>
            <BsArrowLeftShort />
            <strong>Configurações gerais</strong>
          </header>
          <div>
              <section>
                <Input name="email" value="tiaguin180@gmail.com" disabled isFieldset legendText="Email" type="email"/>
                <button type="button" onClick={() => setModalIsOpen(true)}>MUDAR SENHA</button>
                
                <Input name="brandName" isFieldset legendText="Nome da marca" type="text"/>
                <fieldset className="fieldsetProduction">
                  <legend>Produção</legend>
                  <select></select>
                </fieldset>
              </section>
            </div>
          <section>
              <header>
                <h1>Lista de categorias</h1>
                <Button type="button"><AiOutlinePlus /> NOVA</Button>
              </header>
              <Categories>
                <header>
                  <div>
                    <LabelInput>
                      <input type="checkbox"/>
                      <p className="checkmark"></p>
                    </LabelInput>
                    <span>Categoria</span>
                  </div>

                  <div>
                    <span>Preço padrão</span>
                    <button type="button"><BsTrashFill /></button>
                  </div>
                </header>
                <Category>
                  <div>
                    <LabelInput>
                      <input type="checkbox"/>
                      <p className="checkmark"></p>
                    </LabelInput>
                    <span>Categoria <button type="button"><IoMdClose /></button></span>
                  </div>
                  <div>
                    <span className="spanPrice">R$2.000,99</span>
                    <button type="button"><FaEllipsisV /></button>
                  </div>
                </Category>           
              </Categories>
            </section>
        </main>
        <div>
          <Button type="submit">SALVAR</Button>
          <button type="button" className="buttonCancel">CANCELAR</button>
        </div>
        </Form>
        <Modal
          isOpen={modalIsOpen}
        >
          <PasswordModal>
            <header>
              <h2>MUDAR SENHA</h2>
              <button onClick={() => setModalIsOpen(false)}><AiOutlineClose /></button>
            </header>
            <Form onSubmit={handleUpdatePassword}>
              <Input name="currentPassword" isFieldset legendText="Senha atual" type="password"/>
              <Input name="newPassword" isFieldset legendText="Nova senha" type="password"/>
              <Input name="repeatNewPassword" isFieldset legendText="Confirme a nova senha" type="password"/>

              <footer>
                <Button type="submit">SALVAR</Button>
                <button className="buttonCancel">CANCELAR</button>
              </footer>
            </Form>
          </PasswordModal>
        </Modal>
      </Content>
    </Container>
  );
} 