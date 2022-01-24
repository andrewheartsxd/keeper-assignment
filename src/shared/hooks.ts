import { useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import {
  postsRequest,
  postsFailure,
  postsSuccess,
} from '../state/posts/postsSlice';
import { isPosts } from '../types';
import { Urls } from '../enums';
import { getData } from '../utils/postsApi';
import type { RootState, AppDispatch } from '../state/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFetchPosts = (timeout = 0) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(postsRequest());
    const fetchPostsAndSendToStore = async (url: string) => {
      const result = await getData(url);
      setTimeout(() => {
        if (result.data && isPosts(result.data)) {
          dispatch(postsSuccess(result.data));
        }
        if (result.error) {
          dispatch(postsFailure(result));
        }
      }, timeout);
    };
    // To trigger error state + 'refetch' functionality, change Urls.Posts -> Urls.Error
    fetchPostsAndSendToStore(Urls.Posts).catch((error: unknown) =>
      dispatch(postsFailure({ error: (error as Error).message }))
    );
  }, [dispatch, timeout]);
};
