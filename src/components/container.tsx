import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Container({children}: Props) {
  return (
    <div className='flex flex-col justify-center items-center min-w-full min-h-full '>
      {children}
    </div>
  );
}
