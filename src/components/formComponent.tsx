import {Form, Formik} from 'formik';
import React from 'react';
import type {AnyObjectSchema} from 'yup';
import {InputField} from './inputField';
import ErrorResponse from './errorResponse';
import Title from './title';
import Button from './button';

interface FieldsType {
  field: string;
  type: string;
  label: string;
}

interface Values {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface Props {
  validationSchema: AnyObjectSchema;
  title: string;
  fields: FieldsType[];
  errorRef: React.RefObject<string[] | null>;
  mutation: any;
  initialValues: Values;
  styleForm: string;
  children?: React.ReactNode;
}

export default function FormComponent({
  validationSchema,
  title,
  fields,
  errorRef,
  mutation,
  initialValues,
  styleForm,
  children,
}: Props): React.ReactNode {
  const onSubmit = async (values: Values) => {
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
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({errors, touched, isSubmitting}) => (
          <Form className={styleForm}>
            {fields.map(({field, type, label}) => {
              return (
                <InputField
                  key={field}
                  label={label}
                  field={field}
                  type={type}
                  errors={errors}
                  touched={touched}
                />
              );
            })}
            <div className='flex gap-5'>
              <Button isSubmitting={isSubmitting} color='#191930' type='submit'>
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
