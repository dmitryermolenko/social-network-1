import axios, { AxiosResponse } from 'axios';
import { urlGetAllAudios, urlGetMyAudios, urlGetMyPlaylists } from '../urls';

export const fetchAudiosAll = async (): Promise<AxiosResponse> =>
  axios.get(`${urlGetAllAudios}?currentPage=1&itemsOnPage=15`);
export const fetchMyPartAudios = async (id = 1, page = 15): Promise<AxiosResponse> =>
  axios.get(`${urlGetMyAudios}/${id}?currentPage=1&itemsOnPage=${page}`);
export const fetchMyPlaylists = async (id = 1, page = 15): Promise<AxiosResponse> =>
  axios.get(`${urlGetMyPlaylists}`);
