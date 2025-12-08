import {api} from '~/App';

export interface ValuesUserType {
  firstname?: string;
  lastname?: string;
  password?: string;
  email?: string;
}

export const updateUser = async ({body}: {body: ValuesUserType}) => {
  const keysBody = Object.keys(body) as (keyof ValuesUserType)[];

  for (const key of keysBody) {
    if (body[key] === '') {
      delete body[key];
    }
  }
  try {
    const {data} = await api.patch(`update`, body);
    return data;
  } catch (error) {
    throw error;
  }
};
