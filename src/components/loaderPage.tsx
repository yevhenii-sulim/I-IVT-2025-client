import React from 'react';
import {RiseLoader} from 'react-spinners';

export default function LoaderPage(): React.ReactNode {
  return (
    <div className='flex justify-center items-center w-full mt-20'>
      <RiseLoader color='#0891B2' />
    </div>
  );
}
