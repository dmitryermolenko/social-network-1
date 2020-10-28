import axios, { AxiosResponse } from 'axios';
import { urlGetFriends } from './urls';

export const fetchGetFriends = async (id = 1): Promise<AxiosResponse> =>
  axios.get(`${urlGetFriends}/${id}`);
// TEST
export const fetchTESTarticles = async (): Promise<AxiosResponse> =>
  axios.get('https://conduit.productionready.io/api/articles');
export const fetchTESTtoolkitApi = async (): Promise<AxiosResponse> =>
  axios.get('https://reqres.in/api/users/1');
// TEST

axios.interceptors.request.use((config) => {
  config.headers['Access-Control-Allow-Origin'] = '*';
  return config;
});
