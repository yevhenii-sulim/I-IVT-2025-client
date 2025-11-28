import React, {useRef} from 'react';
import {Field, Form, Formik} from 'formik';
import * as yup from 'yup';
import {queryClient} from '../constants/queryClient';
import {auth} from '../api/registration';
import {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';

interface Values {
  password: string;
  email: string;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage(): React.ReactNode {
  const errorRef = useRef<any | null>(null);
  const loginMutation = useMutation({
    mutationFn: (values: Values) => auth({param: 'login', body: values}),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({queryKey: ['user']});
      window.location.reload();
    },
  });
  return (
    <div className='min-h-screen'>
      <h1 className='text-center text-xl font-bold mb-8'>Login</h1>
      <Formik
        initialValues={{email: '', password: ''}}
        validationSchema={validationSchema}
        onSubmit={async (values: Values) => {
          try {
            loginMutation.mutate(values);
          } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
              errorRef.current = error.response.data.message;
            } else {
              errorRef.current = 'Unknown error';
            }
            console.log(error);
          }
        }}
      >
        {({errors, touched, isSubmitting}) => (
          <Form className='flex flex-col gap-4 max-w-100 mx-auto'>
            <div className='flex flex-col'>
              <label htmlFor='email'>Email</label>
              <Field
                name='email'
                type='email'
                placeholder='john@acme.com'
                className={`border rounded-sm py-1 px-2 outline-none focus:bg-cyan-100/10
                ${
                  errors.email && touched.email
                    ? 'border-red-500'
                    : 'border-cyan-600'
                }
                `}
              />
            </div>
            <div className='flex flex-col'>
              <label htmlFor='password'>Password</label>
              <Field
                name='password'
                type='password'
                placeholder='Your password...'
                className={`border rounded-sm py-1 px-2 outline-none focus:bg-cyan-100/10
                ${
                  errors.password && touched.password
                    ? 'border-red-500'
                    : 'border-cyan-600'
                }
                `}
              />
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className={`py-2 px-4 rounded-sm text-black disabled:bg--cyan-600/30 ${
                isSubmitting ? 'bg-cyan-600/30 text-white' : 'bg-cyan-600'
              }`}
            >
              Submit
            </button>
            {errorRef.current && (
              <p className='text-red-500 text-lg mt-4'>{errorRef.current}</p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
