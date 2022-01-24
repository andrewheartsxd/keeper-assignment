const mockPosts = Array.from({ length: 100 }, (v, i) => ({
  userId: i,
  id: i,
  title: `Test Title ${i}`,
  body: `Test body ${i}`,
}));
jest.mock('../../utils/postsApi', () => ({
  getData: () => {
    return Promise.resolve({
      data: mockPosts,
    });
  },
}));

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../state/store';
import Posts from './Posts';

test('it renders 50 posts per page', async () => {
  render(
    <Provider store={store}>
      <Posts postsPerRow={3} postsPerPage={50} />
    </Provider>
  );
  const posts = await screen.findAllByText('Test Title', { exact: false });
  expect(posts.length).toEqual(50);
});
