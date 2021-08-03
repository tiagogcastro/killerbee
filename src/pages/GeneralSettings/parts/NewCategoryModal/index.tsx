import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { useReloadConfiguration } from '../../../../contexts/ReloadConfigurationsContext';
import { api } from '../../../../services/api';

import LoadingGif from '.././../../../assets/images/loading.gif';

import {
  Error,
  NewCategoryModalTag,
} from './styles';

type CategoryType = {
  id: number;
  description: string;
};

type CategorySetting = {
  category_id: number;
  category_description: string;
  default_price: number;
};

export type ErrorType = {
  error_message: string;
  error_status: 'C08';
  status_code: number;
};

export type ModalHandlesNewCategory = {
  handleOpenNewCategoryModal:() => void;
  handleCloseNewCategoryModal:() => void;
};

const NewCategoryModal: React.ForwardRefRenderFunction<ModalHandlesNewCategory> = (props, ref) => {
  const { stateToReloadConfiguration, setStateToReloadConfiguration } = useReloadConfiguration();
  const changeFormNewCategoryRef = useRef<FormHandles>(null);

  const [modalOpen, setOpenModal] = useState(false);
  const [newCategoryLoader, setNewCategoryLoader] = useState(false);
  const [newCategoryError, setNewCategoryError] = useState({text: '', error: false});

  const [categoryType, setCategoryType] = useState<CategoryType[]>([]);
  const [categorySettings, setCategorySetting] = useState<CategorySetting[]>([]);

  useEffect(() => {
    api.get('/main/category').then(response => {
      setCategoryType(response.data);
    }).catch((error: AxiosError) => {
      setNewCategoryError(error.response?.data.error);
    });
  }, []);

  useEffect(() => {
    api.get('/configuration').then((response) => {
      setCategorySetting(response.data.categories_settings);
    });
  }, [modalOpen]);

  const categoryTypeOptions = useMemo(() => {
    const categoriesSettingsMap = categorySettings.map(item => {
      return item.category_id
    });

    const categoriesFinded = categoryType.filter(item => !categoriesSettingsMap.includes(item.id));

    return categoriesFinded.map(category => {
      return {
        value: category.id,
        label: category.description
      };
    });
  }, [categoryType, categorySettings]);
 
  const handleOpenNewCategoryModal = useCallback(() => {
    setOpenModal(true);
  }, []);

  const handleCloseNewCategoryModal = useCallback(() => {
    setOpenModal(false);
  }, []);
  
  const handleNewCategory = useCallback((data) => {
    setNewCategoryLoader(true);

    const dataCustom = {
      ...data,
      default_price: Number(
        data.default_price
        .replace('R$ ', '')
        .replace('.', '')
        .replace(',', '.')
      )
    };
    
    api.post('/configuration/categorySettings', dataCustom).then(response => {
      setOpenModal(false);
      setStateToReloadConfiguration(!stateToReloadConfiguration);
      setNewCategoryError({text: '', error: false});
    }).catch((error: AxiosError) => {
      const errorType = {
        C08: 'default_price',
        default: 'Erro não esperado'
      };
      const errorData: ErrorType | undefined = error.response?.data;

      if(!data.category_id) {
        setNewCategoryError({text: 'Categoria não informada', error: true});
      }

      if(errorData) {
        setNewCategoryError({text: '', error: false});
        changeFormNewCategoryRef.current?.setFieldError(errorType[(errorData).error_status] || errorType.default , (errorData).error_message);
      };
    }).finally(() => {
      setNewCategoryLoader(false);
    });
  }, [stateToReloadConfiguration, setStateToReloadConfiguration]);

  useImperativeHandle(ref, () => {
    return {
      handleOpenNewCategoryModal,
      handleCloseNewCategoryModal
    }
  });

  return (
    <Modal
      isOpen={modalOpen}
    >
      <NewCategoryModalTag isError={!!newCategoryError.error}>
        <header>
          <h2>NOVA CATEGORIA</h2>
          <button onClick={handleCloseNewCategoryModal}><AiOutlineClose /></button>
        </header>
        <Form ref={changeFormNewCategoryRef} onSubmit={handleNewCategory}>
          <fieldset className="fieldset">
            <legend>Nome da categoria</legend>
            <Select name="category_id"
              options={categoryTypeOptions}
              />
            {newCategoryError.error && <Error noPadding><p>{newCategoryError.text}</p></Error> }
          </fieldset>
          <Input name="default_price" mask="currency" maskPrefix="R$" maskStyle={true} isFieldset legendText="Valor padrão" type="text"/>
          <footer>
            <Button type="submit">{newCategoryLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
            <button type="button" onClick={handleCloseNewCategoryModal} className="buttonCancel">CANCELAR</button>
          </footer>
        </Form>
      </NewCategoryModalTag>
    </Modal>
  );
}

const NewCategoryModalF = forwardRef(NewCategoryModal);

export {NewCategoryModalF};