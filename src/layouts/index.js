import React from 'react';
import styles from './index.less';
import Header from '../components/Header';

function BasicLayout({ children }) {
  return (
    <div className={styles.normal}>
      <Header />
      {children}
    </div>
  );
}

export default BasicLayout;
