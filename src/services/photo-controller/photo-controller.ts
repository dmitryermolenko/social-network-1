import axiosLib, { AxiosResponse } from 'axios';
import { ImageCreateDto } from '../../types/image';
import { baseUrlv2 } from '../config';

const axios = axiosLib.create();
axios.interceptors.response.use((response: AxiosResponse) =>
  response.data);
axios.defaults.baseURL = `${baseUrlv2}images`;

export async function getAllImagesByUserId({
  limit,
  offset,
  userId,
}: {
  limit: number;
  offset: number;
  userId: number;
}): Promise<object> {
  return axios.get('', {
    params: {
      limit,
      offset,
      userId,
    },
  });
}

export async function createImage(imageCreateBundle: ImageCreateDto): Promise<void> {
  return axios.post('', imageCreateBundle);
}

/* Написал не все функции контроллера, добавляйте по-необходимости */
