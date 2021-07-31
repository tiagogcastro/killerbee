import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// import { AxiosError } from 'axios';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useRef, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { useReloadConfiguration } from '../../../../contexts/ReloadConfigurationsContext';
import { api } from '../../../../services/api';
// import { api } from '../../../../services/api';

import LoadingGif from '.././../../../assets/images/loading.gif';

import {
  Error,
  EditCategoryModalTag,
} from './styles';

type CategorySetting = {
  category_id: number;
  category_description: string;
  default_price: number | string;
};

export type ModalHandlesEditCategory = {
  handleEditCategory:(data: any) => void;
  handleSetCategory: (category: CategorySetting) => void;
};

const EditCategoryModal: React.ForwardRefRenderFunction<ModalHandlesEditCategory> = (props, ref) => {
  const changeFormNewCategoryRef = useRef<FormHandles>(null);
  const {stateToReloadConfiguration ,setStateToReloadConfiguration } = useReloadConfiguration();
  
  const [category, setCategory] = useState<CategorySetting>({} as CategorySetting);

  const [isModalOpen, setIsOpenModal] = useState(false);
  const [editCategoryLoader, setEditCategoryLoader] = useState(false);
  const [editCategoryError, setEditCategoryError] = useState('');


  const handleEditCategory = useCallback((data) => {
    setEditCategoryLoader(true);
    
    const customData = {
      default_price: Number(data.default_price.replace(/[^\d]+/g,'')),
      category_id: category.category_id,
    };

    api.post('/configuration/categorySettings', customData).then(response => {
      setIsOpenModal(false);
      setStateToReloadConfiguration(!stateToReloadConfiguration);
    }).catch((error) => {

    }).finally(() => {
      setEditCategoryLoader(false);
    });

  }, [stateToReloadConfiguration, setStateToReloadConfiguration, category.category_id]);

  const handleSetCategory = useCallback((category: CategorySetting) => {
    setCategory({
      ...category,
      default_price: category.default_price.toString().replace("R$", ''),
    });
    setIsOpenModal(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleEditCategory,
      handleSetCategory
    };
  });

  return (
    <Modal
      isOpen={isModalOpen}
    >
      <EditCategoryModalTag>
        <header>
          <h2>EDITAR CATEGORIA</h2>
          <button onClick={() => setIsOpenModal(false)}><AiOutlineClose /></button>
        </header>
        <Form ref={changeFormNewCategoryRef} onSubmit={handleEditCategory}>
          <fieldset className="fieldset">
            <legend>Nome da categoria</legend>
            <span>{category.category_description}</span>
          </fieldset>
        
          <Input 
            defaultValue={category.default_price} 
            name="default_price" 
            isFieldset 
            legendText="Valor padrão" 
            type="text"

            mask="currency" 
            maskPrefix="R$" 
            maskStyle={true}
          />
          {editCategoryError && <Error noPadding><p>{editCategoryError}</p></Error> }
          <footer>
            <Button type="submit">{editCategoryLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
            <button type="button" onClick={() => setIsOpenModal(false)} className="buttonCancel">CANCELAR</button>
          </footer>
        </Form>
      </EditCategoryModalTag>
    </Modal>
  );
}

const EditCategoryModalF = forwardRef(EditCategoryModal);

export { EditCategoryModalF };