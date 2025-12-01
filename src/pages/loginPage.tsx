import React, {useRef} from 'react';
import * as yup from 'yup';
import FormComponent from '../components/formComponent';
import {useMutation} from '@tanstack/react-query';
import {auth} from '../api/auth';
import {queryClient} from '../constants/queryClient';
import Container from '../components/container';

interface Values {
  password: string;
  email: string;
}

const initialValues = {
  email: '',
  password: '',
};

const fields = [
  {
    field: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    field: 'password',
    label: 'Password',
    type: 'password',
  },
];

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
      window.location.href = '/';
    },
  });
  return (
    <Container>
      <FormComponent
        validationSchema={validationSchema}
        mutation={loginMutation}
        title='Login'
        fields={fields}
        errorRef={errorRef}
        initialValues={initialValues}
        styleForm='flex flex-col gap-8 mx-auto justify-stretch items-center '
      />
    </Container>
  );
}
