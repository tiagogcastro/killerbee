import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowLeftShort, BsTrashFill } from 'react-icons/bs';
import {FaEllipsisV} from 'react-icons/fa';
import {IoMdClose} from 'react-icons/io';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { Select } from '../../components/Select';
import { api } from '../../services/api';

import LoadingGif from '.././../assets/images/loading.gif';

import { LabelInput } from '../../styles/global';

import {
  Container,
  Content,
  Categories,
  Category,
  Error,
  CategoryMiniModal,
} from './styles';

import { EditCategoryModal } from './parts/EditCategoryModal';
import { NewCategoryModal } from './parts/NewCategoryModal';
import { DeleteCategoryModal } from './parts/DeleteCategoryModal';

type CategorySetting = {
  category_id: number;
  category_description: string;
  default_price: number | string;
}

type UserConfiguration = {
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
  const [userConfiguration, setUserConfiguration] = useState<UserConfiguration>({} as UserConfiguration);
  const [productionType, setProductionType] = useState<ProductionType[]>([]);

  const [ellipsisMiniModalIsOpen, setEllipsisMiniModalIsOpen] = useState(false);

  const [updateSettingsLoader, setUpdateSettingsLoader] = useState(false);
  const [error, setError] = useState('');

  // Partial category modal  
  const [modalNewCategoryIsOpen, setModalNewCategoryIsOpen] = useState(false);
  const [newCategoryLoader, setNewCategoryLoader] = useState(false);
  const [newCategoryerror, setNewCategoryerror] = useState('');
  const [newCategory, setNewCategory] = useState<CategorySetting[]>([]);

  // Partial delete category modal
  const [modalToDeleteCategoryIsOpen, setModalToDeleteCategoryIsOpen] = useState(false);
  const [deleteCategoryLoader, setDeleteCategoryLoader] = useState(false);
  const [category, setCategory] = useState({} as CategorySetting);
  const [isOpenModalToDeleteCategory, setIsOpenModalToDeleteCategory] = useState(false);
  const [categoryId, setCategoryId] = useState(0);

  // Partial edit category modal
  const [modalEditCategoryIsOpen, setModalToEditCategoryIsOpen] = useState(false);
  const [editCategoryLoader, setEditCategoryLoader] = useState(false);
  const [editCategoryerror, setEditCategoryerror] = useState('');

  const handleUpdateSettings = useCallback((data) => {
    setUpdateSettingsLoader(true);
    const dataCustom = {
      ...data,
      production_type: {
        id: data.production_type,
      },
      categories_settings: !userConfiguration.categories_settings ? [] : userConfiguration.categories_settings,
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

  const handleNewCategory = useCallback((data) => {
    setNewCategoryLoader(true);
    api.post('/configuration/categorySettings', data).then(response => {
      setModalNewCategoryIsOpen(false);
      setNewCategory(response.data);
    }).catch((error: AxiosError) => {
      console.log(error.response?.data);
    }).finally(() => {
      setNewCategoryLoader(false);
    });
  }, []);

  const handleDeleteCategory = useCallback((data) => {
    api.delete('/configuration/categorySettings').then(response => {
      if(response) {
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
      }
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleEditCategory = useCallback((data) => {
    
  }, []);

  // function formatPrice(price: number) {
  //   const value = price.toLocaleString('pt-BR', {
  //     style: 'currency',
  //     currency: 'BRL'
  //   });
  //   console.log(value);
  //   // setNewCategoryPrice();
  // };

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
  }, [newCategory]);
 
  useEffect(() => {
    api.get('/main/productionType').then(response => {
      setProductionType(response.data);
    }).catch((error: AxiosError) => {
      setError(error.response?.data.error);
    });
  }, []);

  const handleButtonDeleteCategoryClick = useCallback(({category_id,category_description,default_price}: CategorySetting) => {
    setIsOpenModalToDeleteCategory(true);
    setCategory({
      category_id,
      category_description,
      default_price
    });
    setEllipsisMiniModalIsOpen(false);
  }, []);
  
  const handleButtonEditCategoryClick = useCallback(({category_id,category_description,default_price}: CategorySetting) => {
    setModalToEditCategoryIsOpen(true);
    setCategory({
      category_id,
      category_description,
      default_price
    });
    setEllipsisMiniModalIsOpen(false);
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
              <fieldset>
                <legend>Email</legend>
                <span>{userConfiguration.username}</span>
              </fieldset>
              
              <div>
                <Input name="brand_name" defaultValue={userConfiguration.brand_name} isFieldset legendText="Nome da marca" type="text"/>
                <fieldset className="fieldset">
                <legend>Produção</legend>
                {!userConfiguration.production_type ? (
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
              <Button type="button" onClick={() => setModalNewCategoryIsOpen(true)}><AiOutlinePlus /> NOVA</Button>
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
          </section>
        </main>
        <div>
          <Button type="submit">{updateSettingsLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
          <button type="button" className="buttonCancel">CANCELAR</button>
        </div>
        </Form>

        <NewCategoryModal 
          handleNewCategory={handleNewCategory}
          modalNewCategoryIsOpen={modalNewCategoryIsOpen}
          setModalNewCategoryIsOpen={setModalNewCategoryIsOpen}
          newCategoryerror={newCategoryerror}
          newCategoryLoader={newCategoryLoader}
        />

        <DeleteCategoryModal 
          setIsOpenModal={setIsOpenModalToDeleteCategory}
          isOpenModal={isOpenModalToDeleteCategory}
          handleDeleteCategory={handleDeleteCategory}
          deleteCategoryLoader={deleteCategoryLoader}
          category={category}
        />

        <EditCategoryModal
          category={category}
          handleEditCategory={handleEditCategory}
          modalEditCategoryIsOpen={modalEditCategoryIsOpen}
          setIsOpenModal={setModalToEditCategoryIsOpen}
          editCategoryError={editCategoryerror}
          editCategoryLoader={editCategoryLoader}
        />
      </Content>
    </Container>
  );
} 