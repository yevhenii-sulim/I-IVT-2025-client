import axios from 'axios';
import {BASE_URL} from '../routes';

export interface ValuesUserType {
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
}

export const fetchUser = async (token: string, body: ValuesUserType) => {
  try {
    const {data} = await axios.post(`${BASE_URL}update`, body, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    throw error;
  }
};
