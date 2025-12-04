import {useMutation, useQuery} from '@tanstack/react-query';
import React from 'react';
import {queryClient} from '~/constants/queryClient';
import * as yup from 'yup';
import {getGallery, updateGallery} from '~/api/gallery';
import GalleryForm from '~/pages/galleryPage/galleryForm';
import LoggerPage from '~/components/loggerPage';

interface Values {
  title: string;
  description: string;
}

interface Props {
  id: number;
}

const validationSchema = yup.object({
  title: yup.string().required('Title is required').min(2).max(50),
  description: yup.string().required('Description is required').max(255),
});

export default function UpdateGalleryForm({id}: Props): React.JSX.Element {
  const {data, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: () => getGallery({token, id}),
  });

  const initialValues = {
    title: data?.title,
    description: data?.description,
  };
  const token = localStorage.getItem('token');

  const mutation = useMutation({
    mutationFn: (values: Values) => updateGallery({token, body: values, id}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['gallery']});
    },
  });
  return isLoading ? (
    <LoggerPage />
  ) : (
    <GalleryForm
      validationSchema={validationSchema}
      mutation={mutation}
      initialValues={initialValues}
      title='Create gallery'
    />
  );
}
