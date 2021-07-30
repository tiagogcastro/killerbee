import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { AxiosError } from 'axios';
import { useEffect, useMemo, useRef, useState } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { Button } from '../../../../components/Button';
import { Input } from '../../../../components/Input';
import { Modal } from '../../../../components/Modal';
import { Select } from '../../../../components/Select';
import { api } from '../../../../services/api';

import LoadingGif from '.././../../../assets/images/loading.gif';

import {
  Error,
  NewCategoryModalTag,
} from './styles';

type NewCategoryModalProps = {
  setModalNewCategoryIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  modalNewCategoryIsOpen: boolean;
  handleNewCategory(data: any): void;
  newCategoryerror: string;
  newCategoryLoader: boolean;
};

type CategoryType = {
  id: number;
  description: string;
};

export function NewCategoryModal({modalNewCategoryIsOpen, setModalNewCategoryIsOpen, handleNewCategory, newCategoryerror, newCategoryLoader}: NewCategoryModalProps) {
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
      isOpen={modalNewCategoryIsOpen}
    >
      <NewCategoryModalTag>
        <header>
          <h2>NOVA CATEGORIA</h2>
          <button onClick={() => setModalNewCategoryIsOpen(false)}><AiOutlineClose /></button>
        </header>
        <Form ref={changeFormNewCategoryRef} onSubmit={handleNewCategory}>
          <fieldset className="fieldset">
            <legend>Nome da categoria</legend>
            <Select name="category_id"
              options={categoryTypeOptions}
              />
          </fieldset>
          <Input name="default_price"  isFieldset legendText="Valor padrão" type="text"/>
          {newCategoryerror && <Error noPadding><p>{newCategoryerror}</p></Error> }
          <footer>
            <Button type="submit">{newCategoryLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : 'SALVAR'}</Button>
            <button type="button" onClick={() => setModalNewCategoryIsOpen(false)} className="buttonCancel">CANCELAR</button>
          </footer>
        </Form>
      </NewCategoryModalTag>
    </Modal>
  );
}