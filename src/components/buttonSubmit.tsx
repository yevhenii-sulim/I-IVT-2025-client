import React from 'react';
import {PropagateLoader} from 'react-spinners';

interface Props {
  isSubmitting: boolean;
  color: string;
}

export default function ButtonSubmit({
  isSubmitting,
  color,
}: Props): React.JSX.Element {
  return (
    <div className='h-10 flex justify-center items-center'>
      {isSubmitting ? (
        <PropagateLoader color={color} />
      ) : (
        <button
          type='submit'
          disabled={isSubmitting}
          className={`py-2 px-2 text-[#ffffff] border-[${color}] border rounded-lg bg-[#0101f7]`}
        >
          submit
        </button>
      )}
    </div>
  );
}
