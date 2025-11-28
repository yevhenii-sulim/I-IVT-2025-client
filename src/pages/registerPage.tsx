import React, {useRef} from 'react';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import {queryClient} from '../constants/queryClient';
import {auth} from '../api/registration';
import {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';

interface Values {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const fields = [
  {field: 'firstname', label: 'First name', placeholder: 'Jhon', type: 'text'},
  {field: 'lastname', label: 'Last name', placeholder: 'Durán', type: 'text'},
  {
    field: 'email',
    label: 'Email',
    placeholder: 'mail@gmail.com',
    type: 'email',
  },
  {
    field: 'password',
    label: 'Password',
    placeholder: 'Foo24311',
    type: 'password',
  },
  {
    field: 'confirmPassword',
    label: 'Confirm password',
    placeholder: 'Foo24311',
    type: 'password',
  },
];

const initialValues = fields.reduce((acc, item) => {
  acc[item.field as keyof Values] = '';
  return acc;
}, {} as Values);

const validationSchema = yup.object({
  firstname: yup.string().min(2).max(50).required('First name is required'),
  lastname: yup.string().min(2).max(50).required('Last name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&\-_#]{8,}$/,
      'Min 8 chars, 1 lower, 1 upper, 1 number, 1 special (@$!%*?&-_#)'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&\-_#]{8,}$/,
      'Min 8 chars, 1 lower, 1 upper, 1 number, 1 special (@$!%*?&-_#)'
    )
    .required('Password is required'),
});

export default function RegisterPage(): React.ReactNode {
  const registerMutation = useMutation({
    mutationFn: (values: Values) => auth({param: 'signup', body: values}),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({queryKey: ['user']});
      window.location.reload();
    },
  });
  const errorRef = useRef<any | null>(null);
  return (
    <div className='min-h-screen'>
      <h1 className='text-center text-xl font-bold mb-8'>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          delete values.confirmPassword;
          console.log(values);
          try {
            registerMutation.mutate(values);
          } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
              errorRef.current = error.response.data.message;
            } else {
              errorRef.current = 'Unknown error';
            }
          }
        }}
      >
        {({errors, touched, isSubmitting}) => (
          <Form className='flex flex-col gap-4 max-w-100 mx-auto'>
            {fields.map(({field, type, placeholder, label}) => {
              return (
                <div className='flex flex-col'>
                  <label htmlFor='email' className='capitalize'>
                    {label}
                  </label>
                  <Field
                    name={field}
                    type={type}
                    placeholder={placeholder}
                    className={`border rounded-sm py-1 px-2 outline-none focus:bg-cyan-100/10
                ${
                  errors[field as keyof Values] &&
                  touched[field as keyof Values]
                    ? 'border-red-500'
                    : 'border-cyan-600'
                }
                `}
                  />
                </div>
              );
            })}

            <button
              type='submit'
              disabled={isSubmitting}
              className={`py-2 px-4 rounded-sm text-black disabled:bg--cyan-600/30 ${
                isSubmitting ? 'bg-cyan-600/30 text-white' : 'bg-cyan-600'
              }`}
            >
              Submit
            </button>
            {errorRef.current &&
              errorRef.current
                .split(',')
                .map((item: string[]) => (
                  <p className='text-red-500 text-lg mt-4'>{item}</p>
                ))}
          </Form>
        )}
      </Formik>
    </div>
  );
}
