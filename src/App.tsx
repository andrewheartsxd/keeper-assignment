import React from 'react';
import 'antd/dist/antd.css';

import Posts from './containers/Posts';

import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Posts postsPerRow={3} postsPerPage={50} />
    </div>
  );
}

export default App;
