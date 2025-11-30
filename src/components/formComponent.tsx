import {Form, Formik} from 'formik';
import React from 'react';
import type {AnyObjectSchema} from 'yup';
import {InputField} from './inputField';
import ButtonSubmit from './buttonSubmit';
import ErrorResponse from './errorResponse';
import Title from './title';

interface FieldsType {
  field: string;
  type: string;
  label: string;
}

interface Props {
  validationSchema: AnyObjectSchema;
  title: string;
  fields: FieldsType[];
  errorRef: React.RefObject<string[] | null>;
  mutation: any;
}

export default function FormComponent<T extends Record<string, any>>({
  validationSchema,
  title,
  fields,
  errorRef,
  mutation,
}: Props): React.ReactNode {
  const initialValues = fields.reduce((acc, item) => {
    acc[item.field as keyof T] = '' as T[keyof T];
    return acc;
  }, {} as T);

  const onSubmit = async (values: T) => {
    delete values.confirmPassword;
    await Promise.resolve(() => {
      setInterval(() => {}, 2000);
    });

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
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({errors, touched, isSubmitting}) => (
          <Form className='flex flex-col gap-8 mx-auto justify-stretch items-center '>
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
            <ButtonSubmit isSubmitting={isSubmitting} color='#191930' />
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
