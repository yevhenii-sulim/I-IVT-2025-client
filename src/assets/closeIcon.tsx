import React from 'react';

type CloseIconProps = {
  className?: string;
};

export default function CloseIcon({className = ''}: CloseIconProps) {
  return (
    <svg className={className} viewBox='0 0 24 24' aria-hidden='true'>
      <path
        d='M6 6l12 12M18 6L6 18'
        stroke='#000000'
        strokeWidth='2'
        strokeLinecap='round'
      />
    </svg>
  );
}
