import React from 'react';

interface Props {
  title: string;
}

export default function Title({title}: Props): React.ReactNode {
  return <h1 className='text-center text-xl font-bold mb-8 '>{title}</h1>;
}
