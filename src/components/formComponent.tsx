import {Form, Formik} from 'formik';
import React from 'react';
import type {AnyObjectSchema} from 'yup';

import type {FormikErrors, FormikTouched, FormikValues} from 'formik';
import Title from '~/components/title';
import Button from '~/components/button';
import ErrorResponse from '~/components/errorResponse';

interface Props<T extends FormikValues> {
  validationSchema: AnyObjectSchema;
  title: string;
  errorRef: React.RefObject<string[] | null>;
  mutation: {
    mutateAsync: (data: T) => Promise<any>;
  };
  initialValues: T;
  styleForm: string;
  children?: React.ReactNode;
  returnFields: (
    errors: FormikErrors<T>,
    touched: FormikTouched<T>
  ) => React.ReactNode;
}

export default function FormComponent<T extends FormikValues>({
  validationSchema,
  title,
  errorRef,
  mutation,
  initialValues,
  styleForm,
  children,
  returnFields,
}: Props<T>): React.JSX.Element {
  const onSubmit = async (values: T) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error: any) {
      errorRef.current =
        typeof error.response?.data.message === 'string'
          ? [error.response.data.message]
          : error.response?.data.message ?? ['Unknown error'];
    }
  };

  return (
    <>
      <Title title={title} />
      <Formik<T>
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({errors, touched, isSubmitting}) => (
          <Form className={styleForm}>
            {returnFields(errors, touched)}
            <div className='flex gap-5'>
              <Button
                isSubmitting={isSubmitting}
                color='#191930'
                type='submit'
                className={`py-2 px-4 text-[#ffffff] border rounded-lg bg-[#0101f7]`}
              >
                Submit
              </Button>
              {children}
            </div>
            {errorRef.current &&
              errorRef.current.map((item: string) => (
                <ErrorResponse item={item} key={item} />
              ))}
          </Form>
        )}
      </Formik>
    </>
  );
}
