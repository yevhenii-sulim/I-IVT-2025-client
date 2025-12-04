import React, {type ButtonHTMLAttributes} from 'react';
import {PropagateLoader} from 'react-spinners';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSubmitting?: boolean;
  color?: string;
}

export default function Button({
  children,
  color = '#000000',
  isSubmitting,
  ...props
}: Props): React.JSX.Element {
  return (
    <div className='h-10 flex justify-center items-center'>
      {isSubmitting ? (
        <PropagateLoader color={color} />
      ) : (
        <button
          {...props}
          disabled={isSubmitting}
          className={`py-2 px-4 text-[#ffffff] border rounded-lg bg-[#0101f7]`}
          style={{borderColor: color}}
        >
          {children}
        </button>
      )}
    </div>
  );
}
