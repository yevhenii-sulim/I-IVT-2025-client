import {useMutation} from '@tanstack/react-query';
import React, {useRef} from 'react';
import * as yup from 'yup';
import {auth} from '~/api/auth';
import Container from '~/components/container';
import FormComponent from '~/components/formComponent';
import {InputField} from '~/components/inputField';
import {queryClient} from '~/constants/queryClient';

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

export default function LoginPage(): React.JSX.Element {
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
        errorRef={errorRef}
        initialValues={initialValues}
        styleForm='flex flex-col gap-8 mx-auto justify-stretch items-center '
        returnFields={(errors, touched) =>
          fields.map(({field, type, label}) => {
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
          })
        }
      />
    </Container>
  );
}
