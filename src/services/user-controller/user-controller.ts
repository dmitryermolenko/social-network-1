import axiosLib, { AxiosResponse } from 'axios';
import {
  IUser,
  IUserFriend,
  IUpdatePasswordUser,
  IUpdateStatusUser,
  ICreateUser,
  IUpdateInfoUser,
} from '../../types/user';
import { baseUrlv2 } from '../config';

const axios = axiosLib.create();
axios.interceptors.response.use((response: AxiosResponse) =>
  response.data);
axios.defaults.baseURL = `${baseUrlv2}users`;

export async function getUserById(id: number): Promise<AxiosResponse<IUser>> {
  return axios.get(`/${id}`);
}

export async function getAllUsers(): Promise<AxiosResponse<IUser[]>> {
  return axios.get('');
}

export async function createNewUser(data: ICreateUser): Promise<AxiosResponse<IUser>> {
  return axios.post('', data);
}

export async function updateUser(data: IUpdateInfoUser): Promise<AxiosResponse<IUpdateInfoUser>> {
  return axios.put('', data);
}

export async function updatePassword(
  userId: number,
  data: IUpdatePasswordUser,
): Promise<AxiosResponse<IUpdatePasswordUser>> {
  return axios.patch(`/${userId}/password`, data);
}

export async function updateUserStatus(data: IUpdateStatusUser): Promise<AxiosResponse<IUser>> {
  return axios.patch('/status', data);
}

export async function removeUserById(id: number) {
  return axios.delete(`/${id}`);
}

export async function getFriendsByUserId(id: number) {
  return axios.get<IUserFriend[]>(`/${id}/friends`);
}
