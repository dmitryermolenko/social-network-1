import axios, { AxiosResponse } from 'axios';
import { baseUrlv2 } from '../config';

axios.defaults.baseURL = `${baseUrlv2}audio`;

export const fetchAudiosAll = async (): Promise<AxiosResponse> =>
  axios.get('?currentPage=1&itemsOnPage=15');
export const fetchMyPartAudios = async (id = 60, page = 15): Promise<AxiosResponse> =>
  axios.get(`/user/${id}?currentPage=1&itemsOnPage=${page}`);
export const fetchMyPlaylists = async (id = 60): Promise<AxiosResponse> =>
  axios.get(`/user/${id}/playlists`);
export const fetchMyFriends = async (id = 60): Promise<AxiosResponse> =>
  axios.get(`${baseUrlv2}users/${id}/friends`);
export const fetchSearchedSongs = async (name = ''): Promise<AxiosResponse> =>
  axios.get(`name/${name}`);
export const fetchPlaylist = async (id = 0, limit = 100, offset = 0): Promise<AxiosResponse> =>
  axios.get(`/playlists/${id}/audio?limit=${limit}&offset=${offset}`);
