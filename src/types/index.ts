export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type Posts = Post[];

export type ErrorObject = { error: string };

export function isPost(post: unknown): post is Post {
  return (
    (post as Post).userId !== undefined &&
    (post as Post).id !== undefined &&
    (post as Post).title !== undefined &&
    (post as Post).body !== undefined
  );
}

export function isPosts(posts: unknown): posts is Posts {
  return Array.isArray(posts) && posts.every(isPost);
}
