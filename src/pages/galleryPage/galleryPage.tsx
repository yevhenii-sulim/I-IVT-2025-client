import React, {useRef, useState} from 'react';
import Modal from '~/components/modal';
import CreateGalleryForm from '~/pages/galleryPage/createGalleryForm';
import UpdateGalleryForm from '~/pages/galleryPage/updateGalleryForm';

export default function GalleryPage(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal(param: boolean) {
    setIsOpen(param);
  }
  return (
    <>
      {isOpen && (
        <Modal close={toggleModal}>
          <CreateGalleryForm />
          <UpdateGalleryForm id={id} />
        </Modal>
      )}
    </>
  );
}
