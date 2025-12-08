import clsx from 'clsx';
import React, {MouseEventHandler, useEffect} from 'react';
import CloseIcon from '~/assets/closeIcon';
import Button from '~/components/button';

interface Props {
  children: React.ReactNode;
  close: (prop: boolean) => void;
  className?: string;
}

export default function Modal({
  children,
  close,
  className,
}: Props): React.JSX.Element {
  const closeModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      close(false);
    }
  };

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close(false);
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  return (
    <div
      className='fixed flex justify-center items-center top-0 left-0 w-full h-full bg-blue-100/50'
      onClick={closeModal}
    >
      <div
        className={clsx(
          'w-fit min-h-fit py-8 px-5 bg-white rounded-lg overflow-y-auto flex relative',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={() => close(false)}
          className='w-5 h-5 absolute top-2 right-2 outline-none'
        >
          <CloseIcon />
        </Button>
        {children}
      </div>
    </div>
  );
}
