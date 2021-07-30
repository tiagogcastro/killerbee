import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
// import { AxiosError } from 'axios';
import { forwardRef, useCallback, useImperativeHandle } from 'react';
import { useRef, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
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
  
  const [category, setCategory] = useState<CategorySetting>({} as CategorySetting);

  const [isModalOpen, setIsOpenModal] = useState(false);
  const [editCategoryLoader, setEditCategoryLoader] = useState(false);
  const [editCategoryError, setEditCategoryError] = useState('');

  const handleEditCategory = useCallback(() => {
    setEditCategoryLoader(true);
  }, []);

  const handleSetCategory = useCallback((category: CategorySetting) => {
    setCategory(category);
    setIsOpenModal(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleEditCategory,
      handleSetCategory
    };
  })

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
        
          <Input name="default_price" defaultValue={category.default_price} isFieldset legendText="Valor padrão" type="text"/>
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