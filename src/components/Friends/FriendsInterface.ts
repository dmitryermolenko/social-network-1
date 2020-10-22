import { IUser } from '../../types/user';

export interface ISingleFriendProps {
  firstname: string;
  lastname: string;
  profesion: string;
  avatarka?: string;
  id: number;
  deleteButtonHandler(event: React.MouseEvent, id: number): void;
  messegeButtonHandler(event: React.MouseEvent, id: number): void;
}

// export interface IFrendsProps {
//   loadFrendsList: (arg: number) => void;
//   frendsList: Array<IUser>;
//   loading: boolean;
//   error: Error;
//   frendsFilter:string
// }

// export interface IStore {
//   frendList: {
//     data: Array<IUser>;
//     error: Error;
//     loading: boolean;
//     frendsFilter:string;
//   };
// }
