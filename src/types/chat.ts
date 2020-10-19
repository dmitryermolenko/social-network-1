export interface IsingleChat {
  idMassage: number;
  username: string;
  lastRedactionDate: string;
  persistDate: string;
  mediaDto: ImediaDto[];
  userSenderImage: string;
  message: string;
  active: 'DISABLED' | 'ACTIVE' | null;
}

export interface ImediaDto {
  id: number;
  url: string;
  mediaType: 'IMAGE' | 'AUDIO';
  persistDateTime: string;
}

export interface Ichat {
  id: number;
  type: string;
  title: string;
  image: string;
  lastMessage: string;
  active: 'DISABLED' | 'ACTIVE' | null;
}

export interface IdataBody {
  id: number;
  title: string;
}
