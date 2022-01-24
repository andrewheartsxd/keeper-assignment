import React from 'react';
import { List, Alert, Button } from 'antd';

import Post from '../../components/Post';
import {
  useAppSelector,
  useAppDispatch,
  useFetchPosts,
} from '../../shared/hooks';
import {
  selectPosts,
  selectPending,
  selectErrors,
  removeError,
  manualPostsFetch,
} from '../../state/posts/postsSlice';

import styles from './Posts.module.css';

type PostsProps = {
  postsPerPage?: number;
  postsPerRow?: number;
  children?: React.ReactNode;
};

const Posts = (props: PostsProps) => {
  const { postsPerPage = 10, postsPerRow = 4 } = props;
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const pending = useAppSelector(selectPending);
  const errors = [...useAppSelector(selectErrors)];
  const latestError = errors.pop();

  const timeout = 2000;
  // 2s timeout so the loading spinner gets a chance to be displayed
  useFetchPosts(timeout);

  const handleClose = () => dispatch(removeError());
  const getData = () => dispatch(manualPostsFetch(timeout));

  return (
    <>
      {latestError ? (
        <>
          <Alert
            message={latestError.error}
            type="error"
            closable
            afterClose={handleClose}
          />
          <Button onClick={getData}>Retry</Button>
        </>
      ) : null}
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: postsPerRow,
          lg: postsPerRow,
          xl: postsPerRow,
          xxl: postsPerRow,
        }}
        dataSource={posts}
        loading={pending}
        renderItem={(item) => (
          <List.Item className={styles.listItem}>
            <Post postData={item} />
          </List.Item>
        )}
        pagination={{ defaultPageSize: postsPerPage }}
        className={styles.posts}
      />
    </>
  );
};

export default Posts;
