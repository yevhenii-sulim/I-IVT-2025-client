import axios from 'axios';
import {BASE_URL} from '../routes';

export interface ValuesUserType {
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
}

export const updateUser = async ({
  token,
  body,
}: {
  token: string;
  body: ValuesUserType;
}) => {
  const keysBody = Object.keys(body) as (keyof ValuesUserType)[];

  for (const key of keysBody) {
    if (body[key] === '') {
      delete body[key];
    }
  }
  try {
    const {data} = await axios.patch(`${BASE_URL}update`, body, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    throw error;
  }
};
