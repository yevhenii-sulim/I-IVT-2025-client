import axios from 'axios';
import {BASE_URL} from '../routes';

export const auth = async <T extends Record<string, any>>({
  param,
  body,
}: {
  param: 'login' | 'signup';
  body: T;
}) => {
  const {data} = await axios.post(`${BASE_URL}${param}`, body);
  return data;
};
