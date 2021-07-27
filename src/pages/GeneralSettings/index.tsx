import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { BsArrowLeftShort, BsTrashFill } from 'react-icons/bs';
import {FaEllipsisV} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Select } from '../../components/Select';
import { api } from '../../services/api';

import { LabelInput } from '../../styles/global';

import {
  Container,
  Content,
  Categories,
  Category,
  PasswordModal,
  Error,
} from './styles';

type UserConfiguration = {
  username: string;
  brand_name: string;
  production_type: number;
  categories_settings: {
    category_id: number;
    category_description: string;
    default_price: number;
  }[];
};

type ProductionType = {
  id: number;
  description: string;
};

export type ErrorType = {
  error_message: string;
  error_status: 'C06' | 'C02';
  status_code: number;
};

export function GeneralSettings() {
  const changeFormPasswordRef = useRef<FormHandles>(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [userConfiguration, setUserConfiguration] = useState<UserConfiguration>({} as UserConfiguration);
  const [productionType, setProductionType] = useState<ProductionType[]>([]);

  const [error, setError] = useState('');
  const [changePassworderror, setChangePassworderror] = useState('');

  const [updateSettingsLoader, setUpdateSettingsLoader] = useState(false);
  const [changePasswordLoader, setChangePasswordLoader] = useState(false);

  useEffect(() => {
    setError('');
    api.get('/configuration').then((response) => {
      setUserConfiguration(response.data);
    }).catch((error: AxiosError) => {
      if(error) {
        setUserConfiguration({}  as UserConfiguration);
        api.get('/user/me').then((response) => {
          setUserConfiguration(response.data);
        });
      };
    });

    api.get('/main/productionType').then(response => {
      setProductionType(response.data);
    }).catch((error: AxiosError) => {
      setError(error.response?.data.error);
    });
  }, []);

  const handleUpdateSettings = useCallback((data) => {
    setUpdateSettingsLoader(true);
    const dataCustom = {
      ...data,
      categories_settings: userConfiguration.categories_settings,
    };
    
    api.post('/configuration', dataCustom).then(response => {
      setError('');
      setUserConfiguration(response.data);
    }).catch((error: AxiosError) => {
      if(error.response?.status === 500) {
        setError(error.response.data.error);
        return;
      };

      if(error.response?.status === 404) {
        setError('Tipo de produção não informado');
        return;
      };
    }).finally(() =>{
      setUpdateSettingsLoader(false);
    });
  }, [userConfiguration.categories_settings]);

  const handleUpdatePassword = useCallback((data) => {
    setChangePasswordLoader(true);

    if(data.new_password_confirm.length  < 8 || data.new_password.length < 8)   {
      setChangePassworderror('Mínimo de 8 digitos para nova senha');
      setChangePasswordLoader(false);
      return;
    } else {
      api.put('/user/changePassword', data).then(response => {
        setModalIsOpen(false);
        setChangePassworderror('');
      }).catch((error: AxiosError) => {
        setChangePassworderror(error.response?.data.error_message);
      }).finally(() => {
        setChangePasswordLoader(false);
      });
    };

  }, []);

  const userCategoriesCustom = useMemo(() => {
    return userConfiguration.categories_settings && userConfiguration.categories_settings.map(categories => {
      return {
        ...categories,
        default_price: categories.default_price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}),
      };
    });
  }, [userConfiguration.categories_settings]);

  const productionTypeOptions = useMemo(() => {
    return productionType.map(production => {
      return {
        value: production.id,
        label: production.description
      };
    });
  }, [productionType]);

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
              <fieldset>
                <legend>Email</legend>
                <span>{userConfiguration.username}</span>
              </fieldset>
              <button type="button" onClick={() => setModalIsOpen(true)}>MUDAR SENHA</button>
              
              <Input name="brand_name" defaultValue={userConfiguration.brand_name} isFieldset legendText="Nome da marca" type="text"/>
              <fieldset className="fieldsetProduction">
                <legend>Produção</legend>
                <Select name="production_type" defaultValue={{value: 1, label:'Própria'}}  options={productionTypeOptions}/>
              </fieldset>
            </section>
          </div>
          <Error>
            <p>{error}</p>
          </Error>
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
              {userCategoriesCustom && userCategoriesCustom.map(categories => (
                <Category key={categories.category_id}>
                  <div>
                    <LabelInput>
                      <input type="checkbox"/>
                      <p className="checkmark"></p>
                    </LabelInput>
                    <span>{categories.category_description} <button type="button"><IoMdClose /></button></span>
                  </div>
                  <div>
                    <span className="spanPrice">{categories.default_price}</span>
                    <button type="button"><FaEllipsisV /></button>
                  </div>
                </Category>         
              ))}  
            </Categories>
          </section>
        </main>
        <div>
          <Button type="submit">{updateSettingsLoader ? 'Carregando...' : 'SALVAR'}</Button>
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
            <Form ref={changeFormPasswordRef} onSubmit={handleUpdatePassword}>
              <Input name="current_password" isFieldset legendText="Senha atual" type="password"/>
              <Input name="new_password" isFieldset legendText="Nova senha" type="password"/>
              <Input name="new_password_confirm" isFieldset legendText="Confirme a nova senha" type="password"/>
              {changePassworderror && <Error noPadding><p>{changePassworderror}</p></Error> }
              <footer>
                <Button type="submit">{changePasswordLoader ? 'Carregando...' : 'SALVAR'}</Button>
                <button className="buttonCancel">CANCELAR</button>
              </footer>
            </Form>
          </PasswordModal>
        </Modal>
      </Content>
    </Container>
  );
} 