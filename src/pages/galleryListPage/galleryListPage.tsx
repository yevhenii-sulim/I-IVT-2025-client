import {useQuery} from '@tanstack/react-query';
import React, {useEffect, useRef, useState} from 'react';
import ReactPaginate from 'react-paginate';
import {getAllGalleries} from '~/api/gallery';
import Button from '~/components/button';
import Gallery from '~/components/gallery';
import LoaderPage from '~/components/loaderPage';
import Modal from '~/components/modal';
import CreateGalleryForm from '~/pages/galleryListPage/createGalleryForm';
import UpdateGalleryForm from '~/pages/galleryListPage/updateGalleryForm';

interface Gallery {
  id: number;
  title: string;
  description: string;
  images: string[];
}

export default function GalleryListPage(): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('');
  const [page, setPage] = useState(1);
  const [currentGalleryId, setCurrentGalleryId] = useState(null);
  const limit = 5;
  const classNamePaginationButton =
    'w-10 h-10  text-[#ffffff] rounded-[50%] bg-active flex justify-center items-center cursor-pointer';
  function toggleModal(param: boolean) {
    setIsOpen(param);
  }
  const {data, isLoading} = useQuery({
    queryKey: ['gallery', page],
    queryFn: () => getAllGalleries({page, limit}),
    placeholderData: (previousData) => previousData,
  });

  const paginationPages = Math.max(1, Math.ceil((data?.total ?? 0) / limit));

  const updateGallery = (id: number) => {
    toggleModal(true);
    setOption('update');
    setCurrentGalleryId(id);
  };

  const handlePageClick = (event: {selected: number}) => {
    setPage(event.selected + 1);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-center'>
        <Button
          onClick={() => {
            toggleModal(true);
            setOption('create');
          }}
          color='var(--color-active)'
          type='button'
          className={`py-2 px-4 text-[#ffffff] border rounded-lg bg-active`}
        >
          Create gallery
        </Button>
      </div>
      <div className='mt-10 px-4 lg:px-15 grid justify-items-center md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6 w-fit mx-auto'>
        {isLoading ? (
          <LoaderPage />
        ) : (
          data?.galleries.map((gallery: Gallery) => (
            <Gallery
              key={gallery.id}
              id={gallery.id}
              title={gallery.title}
              description={gallery.description}
              images={gallery.images}
              updateGallery={updateGallery}
              isModalOpen={isOpen}
            />
          ))
        )}
      </div>
      <ReactPaginate
        forcePage={page - 1}
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={paginationPages}
        previousLabel='<'
        renderOnZeroPageCount={null}
        className='flex gap-3 mt-10 w-full justify-center items-center'
        pageLinkClassName={classNamePaginationButton}
        pageClassName='rounded-full overflow-hidden'
        activeLinkClassName='bg-[#3838e9]'
        previousLinkClassName={classNamePaginationButton}
        nextLinkClassName={classNamePaginationButton}
      />
      {isOpen && (
        <Modal close={toggleModal}>
          {option === 'create' && (
            <CreateGalleryForm closeModal={toggleModal} />
          )}
          {option === 'update' && (
            <UpdateGalleryForm id={currentGalleryId} closeModal={toggleModal} />
          )}
        </Modal>
      )}
    </div>
  );
}
