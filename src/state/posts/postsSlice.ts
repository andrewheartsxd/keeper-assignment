import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState, AppThunk } from '../store';
import { getData } from '../../utils/postsApi';
import { Urls } from '../../enums';
import type { Posts, ErrorObject } from '../../types';
import { isPosts } from '../../types';

export interface PostsState {
  posts: Posts;
  pending: boolean;
  status: 'idle' | 'loading' | 'failed';
  errors: ErrorObject[];
}

const initialState: PostsState = {
  posts: [],
  status: 'idle',
  pending: false,
  errors: [],
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postsRequest: (state) => {
      state.pending = true;
    },
    postsSuccess: (state, action: PayloadAction<Posts>) => {
      state.pending = false;
      const { payload: posts } = action;
      state.errors = [];
      state.posts = posts;
    },
    postsFailure: (state, action: PayloadAction<ErrorObject>) => {
      state.pending = false;
      const { payload: error } = action;
      state.errors.push(error);
    },
    removeError: (state) => {
      state.errors.pop();
    },
  },
});

export const { postsRequest, postsSuccess, postsFailure, removeError } =
  postsSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;
export const selectPending = (state: RootState) => state.posts.pending;
export const selectErrors = (state: RootState) => state.posts.errors;

export const manualPostsFetch =
  (timeout: number): AppThunk =>
  async (dispatch) => {
    dispatch(postsRequest());
    const result = await getData(Urls.Posts);
    if (result.data) {
      setTimeout(() => {
        if (isPosts(result.data)) {
          dispatch(postsSuccess(result.data));
        }
      }, timeout);
    }
    if (result.error) {
      dispatch(postsFailure(result));
    }
  };

export default postsSlice.reducer;
