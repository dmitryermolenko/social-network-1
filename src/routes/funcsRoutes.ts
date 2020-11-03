const funcsRoutes = {
  urlApi: (host: string, api: string): string =>
    [host, api].join('/'),
  urlAllAudios: (hostApi: string, audios: string, all: string): string =>
    [hostApi, audios, all].join('/'),
  urlMyAudios: (hostApi: string, audios: string, partAudioOfUser: string, userId = 60): string =>
    [hostApi, audios, partAudioOfUser, userId].join('/'),
  urlFriendsAudios: (hostApi: string, user: string, getFriends: string): string =>
    [hostApi, user, getFriends].join('/'),
  mainWithId: (id: number): string =>
    `${id}`,
  photosWithId: (id: number): string =>
    `/${id}/photo/`,
  photosAlbumWithId: (userId: number, albumId: number): string =>
    `/${userId}/photo/album/${albumId}`,
};

export default funcsRoutes;
