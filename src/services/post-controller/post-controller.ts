import axiosLib, { AxiosResponse } from 'axios';
import { ICreatePost, IPost } from '../../types/post';
import IComment, { ICreateComment } from '../../types/comment';
import { baseUrlv2 } from '../config';

const axios = axiosLib.create();
axios.interceptors.response.use((response) =>
  response.data);
axios.defaults.baseURL = `${baseUrlv2}posts`;

export async function getAllPosts(): Promise<AxiosResponse<IPost[]>> {
  return axios.get('');
}

export async function createNewPost(data: ICreatePost): Promise<AxiosResponse<string>> {
  return axios.post('', data);
}

export async function deletePost(id: number) {
  return axios.delete(`/${id}`);
}

export async function getAllCommentsByPost(id: number): Promise<AxiosResponse<IComment[]>> {
  return axios.get(`/${id}/comments`);
}

export async function addNewCommentToPost(postId: number, comment: ICreateComment) {
  return axios.post(`/${postId}/comment`, comment);
}

export async function getPostsByTag(tagName: string): Promise<AxiosResponse<IPost[]>> {
  return axios.get(`/${tagName}`);
}

export async function getPostsByUser(id: number): Promise<AxiosResponse<IPost[]>> {
  return axios.get(`/user/${id}`);
}
