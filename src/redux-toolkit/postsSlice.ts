import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPostsByUser, getAllCommentsByPost } from '../services/post-controller';
import { IDataPost, IPost } from '../types/post';

const loadPostsByUser = createAsyncThunk('posts/loadPostsByUser', async (id: number) => {
  const response = await getPostsByUser(id);
  return response;
});

const loadCommentsByPost = createAsyncThunk('posts/loadCommentsByPost', async (id: number) => {
  const response = await getAllCommentsByPost(id);
  return response;
});

/*
По итогу у нас образуется примерно следующая модель хранения постов:
{
  loading: boolean - показатель загрузки вообще всех постов,
  error: Error - показатель ошибки всех постов,
  data:[ - массив постов с сопутствующей информацией к ним
        {
          post: post, - объект с содержимым поста
          loading: boolean, - показатель загрузки поста
          error: Error, - показатель ошибки загрузки поста
          comments: comment[] - комментарии, изначально null
        },
        ...
      ]
}
 */
export interface PostsState {
  data: null | IDataPost[],
  loading: boolean,
  error: null | Error,
}

const initialState : PostsState = {
  data: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setData: (state, action) =>
      ({ ...state, data: action.payload, loading: false }),
    setError: (state, action) =>
      ({ ...state, error: action.payload, loading: false }),
    setLoading: (state) =>
      ({ ...state, loading: true }),
  },
  extraReducers: {
    /* POST */
    [loadPostsByUser.pending.type]: (state) =>
      ({ ...state, loading: true }),
    [loadPostsByUser.fulfilled.type]: (state, action) => {
      if (!Array.isArray(action.payload)) {
        return state;
      }
      const newData = action.payload.map((post: IPost) =>
        ({
          post,
          comments: null,
          loading: false,
          error: null,
        }));
      return { ...state, data: newData, loading: false };
    },
    [loadPostsByUser.rejected.type]: (state, action) =>
      ({
        ...state,
        error: action.error,
        loading: false,
      }),
    /* COMMENTS */
    [loadCommentsByPost.pending.type]: (state, action) => {
      const newPosts = (state.data as (IDataPost[] | null))?.map((dataPost: IDataPost) => {
        if (dataPost.post.id === action.meta.arg) {
          return { ...dataPost, loading: true };
        }
        return dataPost;
      });
      return { ...state, data: newPosts };
    },
    [loadCommentsByPost.fulfilled.type]: (state, action) => {
      const newPosts = (state.data as (IDataPost[] | null))?.map((dataPost: IDataPost) => {
        if (dataPost.post.id === action.meta.arg) {
          return { ...dataPost, comments: action.payload, loading: false };
        }
        return dataPost;
      });
      return { ...state, data: newPosts };
    },
    [loadPostsByUser.rejected.type]: (state, action) => {
      const newPosts = (state.data as (IDataPost[] | null))?.map((dataPost: IDataPost) => {
        if (dataPost.post.id === action.meta.arg) {
          return { ...dataPost, loading: false, error: action.error };
        }
        return dataPost;
      });
      return { ...state, data: newPosts };
    },
  },
});

export const { setData, setError, setLoading } = postsSlice.actions;
export { loadPostsByUser, loadCommentsByPost };
export const postsReducer = postsSlice.reducer;
