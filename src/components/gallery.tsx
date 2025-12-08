import {useMutation} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {deleteGallery} from '~/api/gallery';
import Delete from '~/assets/deleteIcon';
import EditIcon from '~/assets/editIcon';
import Button from '~/components/button';
import Modal from '~/components/modal';
import {queryClient} from '~/constants/queryClient';
interface Props {
  title: string;
  description: string;
  images: string[];
  id: number;
  updateGallery: (id: number) => void;
  isModalOpen: boolean;
}

export default function Gallery({
  title,
  description,
  images,
  id,
  updateGallery,
  isModalOpen,
}: Props): React.JSX.Element {
  const [isDeletingModal, setIsDeletingModal] = useState(false);
  const [colorEditIcon, setColorEditIcon] = useState('#000000');
  const [colorDeleteIcon, setColorDeleteIcon] = useState('#000000');
  const hoverColor = '#0101f7';
  const defaultColor = '#000000';
  const deletingGallery = useMutation({
    mutationFn: () => deleteGallery({id}),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['gallery']});
    },
  });
  const handleDelete = () => deletingGallery.mutate();
  return (
    <Link
      to={isDeletingModal || isModalOpen ? undefined : '/images'}
      state={{id, title, description}}
      className='border rounded-lg w-[200px] h-[200px] py-3 px-4 lg:w-[400px] lg:h-[400px] cursor-pointer'
      onClick={(e) => {
        if (isModalOpen) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }}
    >
      <header className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>{title}</h1>
        <div className='flex justify-center items-center gap-2 w-[70px]'>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateGallery(id);
            }}
            className='p-1'
            onMouseEnter={() => setColorEditIcon(hoverColor)}
            onMouseLeave={() => setColorEditIcon(defaultColor)}
          >
            <EditIcon fill={colorEditIcon} height={18} width={18} />
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsDeletingModal(true);
            }}
            onMouseEnter={() => setColorDeleteIcon(hoverColor)}
            onMouseLeave={() => setColorDeleteIcon(defaultColor)}
          >
            <Delete fill={colorDeleteIcon} height={24} width={24} />
          </Button>
        </div>
      </header>
      <main>
        <p className='text-lg'>{description}</p>
        <div className='flex flex-wrap gap-3'>
          {images.map((imgSrc, index) => (
            <img key={index} src={imgSrc} alt={`Gallery image ${index + 1}`} />
          ))}
        </div>
      </main>
      {isDeletingModal && (
        <Modal
          close={(e) => {
            setIsDeletingModal(false);
          }}
          className='flex-col gap-5'
        >
          <h2 className='text-xl font-semibold'>To delete! Are you sure</h2>
          <Button
            onClick={handleDelete}
            className='py-2 px-4 text-[#ffffff] border rounded-lg bg-active'
          >
            Delete
          </Button>
        </Modal>
      )}
    </Link>
  );
}
