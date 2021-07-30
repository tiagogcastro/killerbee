import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';

import LoadingGif from '.././../../../assets/images/loading.gif';
import { DeleteCategoryTag } from './styles';

type DeleteCategoryModalProps = {
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>; 
  isOpenModal: boolean;
  handleDeleteCategory(data: any): void;
  deleteCategoryLoader: boolean;
  categoryDescription: string;
};

export function DeleteCategoryModal({setIsOpenModal, isOpenModal, handleDeleteCategory, deleteCategoryLoader, categoryDescription}: DeleteCategoryModalProps) {
  const changeFormDeleteCategoryRef = useRef<FormHandles>(null);
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
        <p>A categoria <strong>{categoryDescription}</strong> será excluída para sempre e não será possível restaurá-la. Você tem certeza?</p>
        <footer>
          <Button type="submit">{deleteCategoryLoader ? <img className="imgLoading" src={LoadingGif} alt="loading" /> : <> <BsCheck /> SIM </>}</Button>
          <button type="button" onClick={() => setIsOpenModal(false)} className="buttonCancel">CANCELAR</button>
        </footer>
      </Form>
    </DeleteCategoryTag>
  </Modal>
  );
}