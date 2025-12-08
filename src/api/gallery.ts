import {api} from '~/App';

export async function getGallery({id}: {id: number}) {
  const {data} = await api.get(`gallery/${id}`);
  return data;
}

export async function getAllGalleries({
  page,
  limit = 5,
}: {
  page: number;
  limit?: number;
}) {
  const {data} = await api.get(`gallery?page=${page}&limit=${limit}`);
  return data;
}

export async function updateGallery({
  body,
  id,
}: {
  body: Record<string, any>;
  id: number;
}) {
  const {data} = await api.patch(`gallery/${id}`, body);
  return data;
}

export async function deleteGallery({id}: {id: number}) {
  const {data} = await api.delete(`gallery/${id}`);
  return data;
}

export async function createGallery({body}: {body: Record<string, any>}) {
  const {data} = await api.post('gallery', body);
  return data;
}
