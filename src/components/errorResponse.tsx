import React from 'react';

interface Props {
  item: string;
}

export default function ErrorResponse({item}: Props): React.ReactNode {
  return <p className='text-red-500 text-lg mt-4'>{item}</p>;
}
