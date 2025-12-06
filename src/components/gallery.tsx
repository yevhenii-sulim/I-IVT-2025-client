import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {Link} from 'react-router-dom';
import {deleteGallery} from '~/api/gallery';
import Delete from '~/assets/deleteIcon';
import EditIcon from '~/assets/editIcon';
import Button from '~/components/button';
import {queryClient} from '~/constants/queryClient';
interface Props {
  title: string;
  description: string;
  images: string[];
  id: number;
  token: string;
  updateGallery: (id: number) => void;
}

export default function Gallery({
  title,
  description,
  images,
  id,
  token,
  updateGallery,
}: Props): React.JSX.Element {
  const deletingGallery = useMutation({
    mutationFn: () => deleteGallery({token, id}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['gallery']});
    },
  });
  const handleDelete = () => deletingGallery.mutate();
  return (
    <Link
      to='/gallery/images'
      className='border rounded-lg w-[200px] h-[200px] py-3 px-4 lg:w-[400px] lg:h-[400px]'
      state={{id, title, description}}
    >
      <header className='flex justify-between items-center'>
        <h1>{title}</h1>
        <div className='flex justify-center items-center gap-2 w-[70px]'>
          <Button
            onClick={() => updateGallery(id)}
            className='focus:outline-none'
          >
            <EditIcon fill='#000000' height={18} width={18} />
          </Button>
          <Button onClick={handleDelete}>
            <Delete fill='#000000' height={24} width={24} />
          </Button>
        </div>
      </header>
      <main>
        <p>{description}</p>
        <div className='flex flex-wrap gap-3'>
          {images.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt={`Gallery image ${index + 1}`} />
          ))}
        </div>
      </main>
    </Link>
  );
}
