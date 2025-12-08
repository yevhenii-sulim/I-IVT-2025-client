import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {getGallery} from '~/api/gallery';
import Image from '~/components/image';
import LoaderPage from '~/components/loaderPage';

export default function GalleryPage(): React.JSX.Element {
  const {state} = useLocation();
  const {data, isLoading} = useQuery({
    queryKey: ['gallery'],
    queryFn: () => getGallery({id: state.id}),
    placeholderData: (previousData) => previousData,
  });

  return isLoading ? (
    <LoaderPage />
  ) : (
    <div className='mt-10 px-4 lg:px-15 grid justify-items-center md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-fit mx-auto'>
      <header>
        <h1 className='text-center mb-3'>{state.title}</h1>
        <p>{state.description}</p>
      </header>
      <div className='flex flex-wrap gap-3 justify-center'>
        {data?.images.map((image: string) => (
          <Image src={image} key={image} />
        ))}
      </div>
    </div>
  );
}
