import axios from 'axios';

export async function getGallery({token, id}: {id: number; token: string}) {
  const {data} = await axios.get(`gallery/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
}

export async function getAllGalleries({
  token,
  page,
  limit = 5,
}: {
  token: string;
  page: number;
  limit?: number;
}) {
  const {data} = await axios.get(`gallery?page=${page}&limit=${limit}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
}

export async function updateGallery({
  token,
  body,
  id,
}: {
  token: string;
  body: Record<string, any>;
  id: number;
}) {
  const {data} = await axios.patch(`gallery/${id}`, body, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
}

export async function deleteGallery({token, id}: {id: number; token: string}) {
  const {data} = await axios.delete(`gallery/${id}`, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
}

export async function createGallery({
  token,
  body,
}: {
  token: string;
  body: Record<string, any>;
}) {
  const {data} = await axios.post('gallery', body, {
    headers: {Authorization: `Bearer ${token}`},
  });
  return data;
}
