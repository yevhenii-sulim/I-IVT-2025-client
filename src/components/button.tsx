import React, {type ButtonHTMLAttributes} from 'react';
import {PropagateLoader} from 'react-spinners';
import clsx from 'clsx';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSubmitting?: boolean;
  color?: string;
  className?: string;
}

export default function Button({
  children,
  color = '#000000',
  isSubmitting,
  className,
  ...props
}: Props): React.JSX.Element {
  return (
    <button
      {...props}
      disabled={isSubmitting}
      className={clsx(className, 'cursor-pointer focus:outline-none')}
    >
      {isSubmitting ? <PropagateLoader color={color} /> : children}
    </button>
  );
}
