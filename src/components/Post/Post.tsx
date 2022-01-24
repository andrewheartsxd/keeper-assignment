import React from 'react';
import { Card } from 'antd';

import type { Post as PostType } from '../../types';

import styles from './Post.module.css';

type PostProps = {
  postData: PostType;
  children?: React.ReactNode;
};

const Post = (props: PostProps): JSX.Element => {
  const { postData } = props;
  const { title, body } = postData;
  return (
    <Card title={title} className={styles.post}>
      <p>{body}</p>
    </Card>
  );
};

export default Post;
