import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {fetchUser} from '../api/fetchUser';
import {useLoaderData} from 'react-router-dom';

export default function ProfilePage(): React.ReactNode {
  const loaderData = useLoaderData();
  const token = localStorage.getItem('token') || '';

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(token),
    initialData: loaderData,
    staleTime: 1000,
  });
  const {firstname, lastname, email, createdAt} = query.data;
  return (
    <div className='w-full text-lg text-[#191930] flex flex-col gap-4 px-4 white lg:px-15'>
      <p className=''>First name {firstname}</p>
      <p className=''>Last name {lastname}</p>
      <p className=''>Email {email}</p>
      <p className=''>
        Date of registration {new Date(createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
