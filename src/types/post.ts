import ITag, { ICreateTag } from './tag';
import IMedia from './media';
import IComment from './comment';

export interface IPost {
  id: number;
  userId: number;
  avatar: string;
  firstName: string;
  lastName: string;
  bookmarkAmount: number | null;
  commentAmount: number | null;
  likeAmount: number | null;
  shareAmount: number | null;
  persistDate: string;
  title: string;
  text: string;
  tags?: ITag[];
  media?: IMedia[];
}

export interface ICreatePost {
  userId: number;
  title: string;
  text: string;
  tags?: ICreateTag[];
  media?: IMedia[];
  avatar?: string;
  firstName?: string;
  lastName?: string;
  bookmarkAmount?: number;
  commentAmount?: number;
  likeAmount?: number;
  shareAmount?: number;
}

export interface IDataPost {
  post: IPost;
  loading: boolean;
  error: Error;
  comments?: IComment[];
}
