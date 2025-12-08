import {useMutation, useQuery} from '@tanstack/react-query';
import React from 'react';
import {queryClient} from '~/constants/queryClient';
import * as yup from 'yup';
import {getGallery, updateGallery} from '~/api/gallery';
import LoaderPage from '~/components/loaderPage';
import GalleryForm from '~/pages/galleryListPage/galleryForm';

interface Values {
  title: string;
  description: string;
}

interface Props {
  id: number;
  closeModal: (param: boolean) => void;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required').min(2).max(50),
  description: yup.string().required('Description is required').max(255),
});

export default function UpdateGalleryForm({
  id,
  closeModal,
}: Props): React.JSX.Element {
  const {data, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: () => getGallery({id}),
  });

  const initialValues = {
    title: data?.title,
    description: data?.description,
  };

  const mutation = useMutation({
    mutationFn: (values: Values) => updateGallery({body: values, id}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['gallery']});
      closeModal(false);
    },
  });
  return isLoading ? (
    <LoaderPage />
  ) : (
    <>
      <GalleryForm
        validationSchema={validationSchema}
        mutation={mutation}
        initialValues={initialValues}
        title='Create gallery'
      />
    </>
  );
}
