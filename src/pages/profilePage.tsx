import React, {useRef, useState} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import * as yup from 'yup';
import {fetchUser} from '~/api/fetchUser';
import {queryClient} from '~/constants/queryClient';
import {updateUser} from '~/api/updateUser';
import Button from '~/components/button';
import FormComponent from '~/components/formComponent';
import {InputField} from '~/components/inputField';
import LoaderPage from '~/components/loaderPage';

interface Values {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

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
];

const validationSchema = yup.object({
  firstname: yup.string().min(2).max(50).notRequired(),
  lastname: yup.string().min(2).max(50).notRequired(),
  email: yup.string().email('Enter a valid email').notRequired(),
  password: yup
    .string()
    .notRequired()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&\-_#]{8,}$/,
      'Min 8 chars, 1 lower, 1 upper, 1 number'
    ),
});

const Field = ({name, dataName}: {name: string; dataName: string}) => (
  <p className=''>
    {name} {dataName}
  </p>
);

const Container = ({children}: {children: React.ReactNode}) => (
  <div className='w-full text-lg text-[#191930] flex flex-col items-start gap-4 px-4 white lg:px-15'>
    {children}
  </div>
);

export default function ProfilePage(): React.JSX.Element {
  const [isEditing, setIsEditing] = useState(false);

  const {data, isLoading} = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });

  const initialValues = {
    firstname: data?.firstname ?? '',
    lastname: data?.lastname ?? '',
    email: data?.email ?? '',
    password: '',
  };

  const logOut = () => {
    localStorage.removeItem('token');
    queryClient.removeQueries({queryKey: ['user']});
    window.location.href = '/login';
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  const editProfile = () => {
    setIsEditing(true);
  };

  const updateMutation = useMutation({
    mutationFn: (values: Values) => updateUser({body: values}),
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({queryKey: ['user']});
    },
  });
  const errorRef = useRef<any | null>(null);

  return (
    <div className='mt-10 grid justify-items-center mx-auto'>
      {isLoading ? (
        <LoaderPage />
      ) : !isEditing ? (
        <div>
          <Field name='First name' dataName={data?.firstname} />
          <Field name='Last name' dataName={data?.lastname} />
          <Field name='Email' dataName={data?.email} />
          <Field
            name='Date of registration'
            dataName={new Date(data?.createdAt).toLocaleDateString()}
          />

          <div className='flex gap-4'>
            <Button
              color='#0101f7'
              onClick={logOut}
              type='button'
              className={`py-2 px-4 text-[#ffffff] border rounded-lg bg-active`}
            >
              log out
            </Button>
            <Button
              color='#0101f7'
              onClick={editProfile}
              type='button'
              className={`py-2 px-4 text-[#ffffff] border rounded-lg bg-active`}
            >
              edit
            </Button>
          </div>
        </div>
      ) : (
        <FormComponent
          validationSchema={validationSchema}
          mutation={updateMutation}
          title='Edit'
          initialValues={initialValues}
          errorRef={errorRef}
          styleForm='flex flex-col gap-8 justify-stretch items-start'
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
        >
          <Button color='#0101f7' onClick={cancelEdit} type='button'>
            cancel
          </Button>
        </FormComponent>
      )}
    </div>
  );
}
