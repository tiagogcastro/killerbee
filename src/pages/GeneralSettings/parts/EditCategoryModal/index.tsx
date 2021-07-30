import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { api } from '../../../../services/api';

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

type EditCategoryModalProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalEditCategoryIsOpen: boolean;
  handleEditCategory(data: any): void;
  editCategoryError: string;
  editCategoryLoader: boolean;

  category: CategorySetting;
};

type CategoryType = {
  id: number;
  description: string;
};

export function EditCategoryModal({handleEditCategory, modalEditCategoryIsOpen, setIsOpenModal, editCategoryError, editCategoryLoader, category}: EditCategoryModalProps) {
  const changeFormNewCategoryRef = useRef<FormHandles>(null);

  const [categoryType, setCategoryType] = useState<CategoryType[]>([]);

  useEffect(() => {
    api.get('/main/category').then(response => {
      setCategoryType(response.data);
    }).catch((error: AxiosError) => {
      console.log(error.response?.data.error);
    });
  }, []);

  const categoryTypeOptions = useMemo(() => {
    return categoryType.map(category => {
      return {
        value: category.id,
        label: category.description
      };
    });
  }, [categoryType]);

  return (
    <Modal
      isOpen={modalEditCategoryIsOpen}
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