import React, {useRef} from 'react';
import * as yup from 'yup';
import {useMutation} from '@tanstack/react-query';
import FormComponent from '~/components/formComponent';
import {auth} from '~/api/auth';
import {queryClient} from '~/constants/queryClient';
import Container from '~/components/container';
import {InputField} from '~/components/inputField';

interface Values {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const fields = [
  {field: 'firstname', label: 'First name', type: 'text'},
  {field: 'lastname', label: 'Last name', type: 'text'},
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
  {
    field: 'confirmPassword',
    label: 'Confirm password',

    type: 'password',
  },
];

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
      'Min 8 chars, 1 lower, 1 upper, 1 number'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .when('password', {
      is: (val: string) => !!val,
      then: (schema) =>
        schema.oneOf([yup.ref('password')], 'Passwords must match'),
    }),
});

export default function RegisterPage(): React.ReactNode {
  const registerMutation = useMutation({
    mutationFn: (values: Values) => auth({param: 'signup', body: values}),
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      queryClient.invalidateQueries({queryKey: ['user']});
      window.location.href = '/';
    },
  });
  const errorRef = useRef<any | null>(null);

  return (
    <Container>
      <FormComponent
        validationSchema={validationSchema}
        mutation={registerMutation}
        title='Registration'
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
