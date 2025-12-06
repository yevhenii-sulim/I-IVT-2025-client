import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {createGallery} from '~/api/gallery';
import * as yup from 'yup';
import {queryClient} from '~/constants/queryClient';
import GalleryForm from '~/pages/galleryListPage/galleryForm';

interface Values {
  title: string;
  description: string;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required').min(2).max(50),
  description: yup.string().required('Description is required').max(255),
});

const initialValues = {
  title: '',
  description: '',
};

interface Props {
  closeModal: (param: boolean) => void;
}

export default function CreateGalleryForm({
  closeModal,
}: Props): React.JSX.Element {
  const token = localStorage.getItem('token');

  const mutation = useMutation({
    mutationFn: (values: Values) => createGallery({token, body: values}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['gallery']});
      closeModal(false);
    },
  });
  return (
    <GalleryForm
      validationSchema={validationSchema}
      mutation={mutation}
      initialValues={initialValues}
      title='Create gallery'
    />
  );
}
