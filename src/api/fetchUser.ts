import axios from 'axios';
import {BASE_URL} from '../routes';

export const fetchUser = async (token: string) => {
  try {
    const {data} = await axios.get(`${BASE_URL}user`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    return error;
  }
};
