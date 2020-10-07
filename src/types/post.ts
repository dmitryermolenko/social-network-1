import ITag, { ICreateTag } from './tag';
import IMedia from './media';
import IComment from './comment';

export interface IPost {
    id: number,
    userId: number,
    avatar: string,
    firstName: string,
    lastName: string,
    bookmarkAmount: number,
    commentAmount: number,
    likeAmount: number,
    shareAmount: number,
    persistDate: string,
    title: string,
    text: string,
    tags?: ITag[],
    media?: IMedia[]
}

export interface ICreatePost {
    userId: number,
    avatar: string,
    firstName: string,
    lastName: string,
    bookmarkAmount: number,
    commentAmount: number,
    likeAmount: number,
    shareAmount: number,
    title: string,
    text: string,
    tags?: ITag[],
    media?: IMedia[]
}

export interface IDataPost {
    post: IPost,
    loading: boolean,
    error: Error,
    comments?: IComment[]
}
