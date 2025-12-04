import React from 'react';
import CloseIcon from '~/assets/close';
import Button from '~/components/button';

interface Props {
  children: React.ReactNode;
  close: (prop: boolean) => void;
}

export default function Modal({children, close}: Props): React.JSX.Element {
  return (
    <div className='fixed flex justify-center items-center top-0 left-0 w-full h-full bg-blue-100/50'>
      <div className='w-[80%] min-h-[80%] bg-white rounded-lg overflow-y-auto flex relative'>
        <Button
          onClick={() => close(false)}
          className='w-5 h-5 absolute top-10 right-10'
        >
          <CloseIcon />
        </Button>
        {children}
      </div>
    </div>
  );
}
