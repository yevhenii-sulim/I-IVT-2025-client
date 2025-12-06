import React from 'react';

export default function Image({src}: {src: string}): React.JSX.Element {
  return (
    <div className='w-5 h-5 rounded-2xl overflow-hidden'>
      <img className='w-full h-full object-contain' src={src} alt={src} />
    </div>
  );
}
