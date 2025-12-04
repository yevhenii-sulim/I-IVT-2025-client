import React, {useRef} from 'react';
import FormComponent from '~/components/formComponent';
import {InputField} from '~/components/inputField';

export default function GalleryForm({
  validationSchema,
  mutation,
  initialValues,
  title,
}): React.JSX.Element {
  const errorRef = useRef<any | null>(null);
  return (
    <div className='flex flex-col w-full justify-center items-center'>
      <FormComponent
        validationSchema={validationSchema}
        mutation={mutation}
        title={title}
        errorRef={errorRef}
        initialValues={initialValues}
        styleForm='flex flex-col gap-8 mx-auto justify-stretch items-center'
        returnFields={(errors, touched) => (
          <>
            <InputField
              label='Title'
              field='title'
              type='text'
              errors={errors}
              touched={touched}
            />
            <InputField
              label='Description'
              field='description'
              errors={errors}
              touched={touched}
              as='textarea'
              style={{height: '200px'}}
            />
          </>
        )}
      />
    </div>
  );
}
