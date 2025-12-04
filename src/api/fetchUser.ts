import axios from 'axios';

export const fetchUser = async (token: string) => {
  try {
    const {data} = await axios.get(`user`, {
      headers: {Authorization: `Bearer ${token}`},
    });
    return data;
  } catch (error) {
    throw error;
  }
};
