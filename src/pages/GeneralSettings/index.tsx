import { Form } from '@unform/web';
import { useCallback } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowLeftShort, BsTrashFill } from 'react-icons/bs';
import {FaEllipsisV} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { LabelInput } from '../../styles/global';

import {
  Container,
  Content,
  Categories,
  Category,
} from './styles';

export function GeneralSettings() {

  const handleUpdateSettings = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <Container>
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
                <Button>MUDAR SENHA</Button>
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
                <Button><AiOutlinePlus /> NOVA</Button>
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
                    <button><BsTrashFill /></button>
                  </div>
                </header>
                <Category>
                  <div>
                    <LabelInput>
                      <input type="checkbox"/>
                      <p className="checkmark"></p>
                    </LabelInput>
                    <span>Categoria <button><IoMdClose /></button></span>
                  </div>
                  <div>
                    <span className="spanPrice">R$2.000,99</span>
                    <button><FaEllipsisV /></button>
                  </div>
                </Category>           
              </Categories>
            </section>
        </main>
        <div>
          <Button>SALVAR</Button>
          <button className="cancel">CANCELAR</button>
        </div>
        </Form>
      </Content>
    </Container>
  );
} 