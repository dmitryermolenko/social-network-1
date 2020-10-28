import {
  pathApi,
  pathAudios,
  pathGetFriends,
  pathHost,
  pathUser,
} from '../constants/urlPaths';
import funcsRoutes from '../routes/funcsRoutes';

const urlApi = funcsRoutes.urlApi(pathHost, pathApi);
export const urlGetAllAudios = funcsRoutes.urlAllAudios(urlApi, pathAudios);
export const urlGetMyAudios = funcsRoutes.urlMyAudios(urlApi, pathAudios, pathUser);
export const urlGetFriends = funcsRoutes.urlFriendsAudios(urlApi, pathUser, pathGetFriends);
