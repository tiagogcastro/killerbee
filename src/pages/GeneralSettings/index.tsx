import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowLeftShort } from 'react-icons/bs';
import {FaEllipsisV} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { api } from '../../services/api';

import LoadingGif from '.././../assets/images/loading.gif';
import notCategoryImage from '.././../assets/images/notCategory.svg';

import {
  Container,
  Content,
  Categories,
  Category,
  Error,
  CategoryMiniModal,
  NotUserConfiguration,
} from './styles';

import { EditCategoryModalF, ModalHandlesEditCategory } from './parts/EditCategoryModal';
import { ModalHandlesNewCategory , NewCategoryModalF} from './parts/NewCategoryModal';
import { DeleteCategoryModalF, ModalHandlesDeleteCategory } from './parts/DeleteCategoryModal';
import { useReloadConfiguration } from '../../contexts/ReloadConfigurationsContext';

type CategorySetting = {
  category_id: number;
  category_description: string;
  default_price: number | string;
}

export type User = {
  username: string;
};

export type UserConfiguration = {
  username: string;
  brand_name: string;
  production_type: {
    id: number;
    description: string;
  };
  categories_settings: CategorySetting[];
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
  const { stateToReloadConfiguration } = useReloadConfiguration();

  const [userConfiguration, setUserConfiguration] = useState<UserConfiguration>();
  const [user, setUser] = useState<User>({} as User);
  const [productionType, setProductionType] = useState<ProductionType[]>([]);

  const [ellipsisMiniModalIsOpen, setEllipsisMiniModalIsOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  const [updateSettingsLoader, setUpdateSettingsLoader] = useState(false);
  const [error, setError] = useState('');

  const newCategoryModalRef = useRef<ModalHandlesNewCategory>({} as ModalHandlesNewCategory);
  const deleteModalRef = useRef<ModalHandlesDeleteCategory>({} as ModalHandlesDeleteCategory);
  const editModalRef = useRef<ModalHandlesEditCategory>({} as ModalHandlesEditCategory);

  const handleUpdateSettings = useCallback((data) => {
    setUpdateSettingsLoader(true);
    const dataCustom = {
      ...data,
      production_type: {
        id: data.production_type,
      },
      categories_settings: !userConfiguration?.categories_settings ? [] : userConfiguration?.categories_settings,
    };

    api.post('/configuration', dataCustom).then(response => {
      setError('');
      setUserConfiguration(response.data);
    }).catch((error: AxiosError) => {
      if(error.response?.status === 500) {
        setError('Erro interno. Reinicie a página');
        return;
      };

      if(error.response?.status === 404) {
        setError('Tipo de produção não informado');
        return;
      };
    }).finally(() =>{
      setUpdateSettingsLoader(false);
    });
  }, [userConfiguration?.categories_settings]);

  const handleButtonDeleteCategoryClick = useCallback((category: CategorySetting) => {
    deleteModalRef.current.handleSetCategory(category);

    setEllipsisMiniModalIsOpen(false);
  }, []);
  
  const handleButtonEditCategoryClick = useCallback((category: CategorySetting) => {
    editModalRef.current.handleSetCategory(category);

    setEllipsisMiniModalIsOpen(false);
  }, []);

  const handleOpenNewCategoryModal = useCallback(() => {
    newCategoryModalRef.current?.handleOpenNewCategoryModal();
  }, []);

  useEffect(() => {
    setError('');
    api.get('/configuration').then((response) => {
      setUserConfiguration(response.data);
    }).catch((error: AxiosError) => {
      if(error.response?.status !== 401) {
        api.get('/user/me').then((response) => {
          setUser(response.data);
        });
      };
    });
  }, [stateToReloadConfiguration]);

  useEffect(() => {
    api.get('/main/productionType').then(response => {
      setProductionType(response.data);
    }).catch((error: AxiosError) => {
      setError(error.response?.data.error);
    });
  }, []);

  const userCategoriesCustom = useMemo(() => {
    return userConfiguration?.categories_settings && userConfiguration?.categories_settings.map(categories => {
      return {
        ...categories,
        default_price: categories.default_price.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}),
      };
    });
  }, [userConfiguration?.categories_settings]);

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
                <span>{userConfiguration?.username || user.username}</span>
              </fieldset>
              
              <div>
                <Input name="brand_name" defaultValue={userConfiguration?.brand_name} isFieldset legendText="Nome da marca" type="text"/>
                <fieldset className="fieldset">
                <legend>Produção</legend>
                {!userConfiguration?.production_type ? (
                  <>
                  <Select name="production_type"
                    options={productionTypeOptions}
                  />
                  </>
                ): (
                  <Select name="production_type"
                    defaultValue={{
                      value: userConfiguration.production_type.id, label: userConfiguration.production_type.description
                    }}
                    options={productionTypeOptions}
                  />
                )}
              </fieldset>
              </div>
            </section>
          </div>
          <Error>
            <p>{error}</p>
          </Error>
          
            <section>
              <header>
                <h1>Lista de categorias</h1>
                {userConfiguration && <Button type="button" onClick={handleOpenNewCategoryModal}><AiOutlinePlus /> NOVA</Button>}
              </header>
              {!userConfiguration ? (
                <NotUserConfiguration>
                  <p>Conclua seus dados para poder cadastrar categorias</p>
                  <img src={notCategoryImage} alt="Sem categorias" />
                </NotUserConfiguration>
              ) : (
              <Categories>
                <header>
                  <div>
                    <span>Categoria</span>
                  </div>

                  <div>
                    <span>Preço padrão</span>
                  </div>
                </header>
                {userCategoriesCustom && userCategoriesCustom.map(categories => (
                  <Category key={categories.category_id}>
                    <div>
                      <span>{categories.category_description} <button type="button" onClick={() =>handleButtonDeleteCategoryClick(categories)}><IoMdClose /></button></span>
                    </div>
                    <div>
                      <span className="spanPrice">{categories.default_price}</span>
                      <button type="button" onClick={() => {
                        return (
                          setEllipsisMiniModalIsOpen(!ellipsisMiniModalIsOpen),
                          setCategoryId(categories.category_id)
                        )
                      }}>
                        <FaEllipsisV />
                      </button>
                      {ellipsisMiniModalIsOpen && categoryId === categories.category_id && (
                      <CategoryMiniModal>
                        <i>
                          <button 
                            type="button" 
                            onClick={() => setEllipsisMiniModalIsOpen(false)}>
                              <IoMdClose />
                          </button>
                        </i>
                        <button type="button" onClick={() => handleButtonEditCategoryClick(categories)}>Editar</button>
                        <p></p>
                        <button 
                          type="button" 
                          className="delete" 
                          onClick={() =>handleButtonDeleteCategoryClick(categories)}>
                          Excluir
                        </button>
                      </CategoryMiniModal>
                      )}
                    </div>
                  </Category>         
                ))}  
              </Categories>
            )}
          </section>
        </main>
        <div>
          <Button type="submit">{updateSettingsLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
          <button type="button" className="buttonCancel">CANCELAR</button>
        </div>
        </Form>

        <NewCategoryModalF
          ref={newCategoryModalRef}
        />

        <DeleteCategoryModalF 
          ref={deleteModalRef}
        />

        <EditCategoryModalF
          ref={editModalRef}
        />
      </Content>
    </Container>
  );
} 