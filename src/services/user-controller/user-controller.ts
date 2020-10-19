import axiosLib, { AxiosResponse } from 'axios';
import { IUser, IUserFriend, IUserStatusUpdate } from '../../types/user';
import baseUrl from '../config';

const axios = axiosLib.create();
axios.interceptors.response.use((response: AxiosResponse) =>
  response.data);
axios.defaults.baseURL = `${baseUrl}user`;

export async function getUserById(id: number): Promise<AxiosResponse<IUser>> {
  return axios.get(`/${id}`);
}

export async function getAllUsers(): Promise<AxiosResponse<IUser[]>> {
  return axios.get('/all');
}

export async function createNewUser(data: IUser): Promise<AxiosResponse<IUser>> {
  return axios.post('/create', data);
}

export async function removeUserById(id: number) {
  return axios.delete(`/delete/${id}`);
}

export async function getFriendsByUserId(id: number) {
  return axios.get<IUserFriend[]>(`/getFriends/${id}`);
}

export async function updateUser(data: IUser): Promise<AxiosResponse<IUser>> {
  return axios.put('/update', data);
}

export async function updateUserStatus(data: IUserStatusUpdate): Promise<AxiosResponse<IUser>> {
  return axios.patch('/update/status', data);
}
