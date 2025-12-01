import React from 'react';

interface Props {
  children: React.ReactNode;
  color: string;
  borderColor: string;
  onClick: () => void;
}

export default function Button({children, color, borderColor, onClick}: Props) {
  return (
    <button
      type='button'
      onClick={onClick}
      className={`py-2 px-4 text-[#ffffff] border-[${borderColor}] border rounded-lg bg-[${color}]`}
    >
      {children}
    </button>
  );
}
