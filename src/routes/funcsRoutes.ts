const funcsRoutes = {
  urlApi: (host: string, api: string): string =>
    [host, api].join('/'),
  urlAllAudios: (hostApi: string, audios: string): string =>
    [hostApi, audios].join('/'),
  urlMyAudios: (
    hostApi: string, audios: string, user: string,
  ): string =>
    [hostApi, audios, user].join('/'),
  urlFriendsAudios: (hostApi: string, user: string, getFriends: string): string =>
    [hostApi, user, getFriends].join('/'),
  mainWithId: (id: number): string =>
    `${id}`,
};

export default funcsRoutes;
