import axios from 'axios';

export const auth = async <T extends Record<string, any>>({
  param,
  body,
}: {
  param: 'login' | 'signup';
  body: T;
}) => {
  const {firstname, lastname, email, password} = body;
  const {data} = await axios.post(`${param}`, {
    firstname,
    lastname,
    email,
    password,
  });
  return data;
};
