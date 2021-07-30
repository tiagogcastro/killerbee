import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import { api } from '../../../../services/api';

import LoadingGif from '.././../../../assets/images/loading.gif';
import { DeleteCategoryTag } from './styles';

type CategorySetting = {
  category_id: number;
  category_description: string;
  default_price: number | string;
}

export type ModalHandlesDeleteCategory = {
  handleDeleteCategory:(data: any) => void;
  handleSetCategory: (category: CategorySetting) => void;
};

const DeleteCategoryModal: React.ForwardRefRenderFunction<ModalHandlesDeleteCategory> = (props, ref) => {
  const changeFormDeleteCategoryRef = useRef<FormHandles>(null);
  
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [category, setCategory] = useState<CategorySetting>({} as CategorySetting);

  const [deleteCategoryLoader, setDeleteCategoryLoader] = useState(false);
  
  const handleDeleteCategory = useCallback((data) => {
    setDeleteCategoryLoader(true);
    api.delete('/configuration/categorySettings', {data: {category_id: category.category_id}}).then(response => {
      setIsOpenModal(false);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setDeleteCategoryLoader(false);
    });
  }, [category]);

  const handleSetCategory = useCallback((category: CategorySetting) => {
    setCategory(category);
    setIsOpenModal(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      handleDeleteCategory,
      handleSetCategory
    };
  })

  return (
    <Modal
    isOpen={isOpenModal}
  >
    <DeleteCategoryTag>
      <header>
        <h2>EXCLUIR CATEGORIA</h2>
        <button onClick={() => setIsOpenModal(false)}><AiOutlineClose /></button>
      </header>
      <Form ref={changeFormDeleteCategoryRef} onSubmit={handleDeleteCategory}>
        <p>A categoria <strong>{category.category_description}</strong> será excluída para sempre e não será possível restaurá-la. Você tem certeza?</p>
        <footer>
          <Button type="submit">{deleteCategoryLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : <> <BsCheck /> SIM </>}</Button>
          <button type="button" onClick={() => setIsOpenModal(false)} className="buttonCancel">CANCELAR</button>
        </footer>
      </Form>
    </DeleteCategoryTag>
  </Modal>
  );
}

const DeleteCategoryModalF = forwardRef(DeleteCategoryModal);

export {DeleteCategoryModalF};