import {api} from '~/App';

export const fetchUser = async () => {
  try {
    const {data} = await api.get(`user`);
    return data;
  } catch (error) {
    throw error;
  }
};
