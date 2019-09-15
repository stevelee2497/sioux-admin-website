import React from 'react';
import styles from './index.less';
import Header from '../components/Header';

function BasicLayout({ children, location }) {
  if (location.pathname.toLowerCase() === '/login') {
    return <div className={styles.normal}>{children}</div>;
  }

  return (
    <div className={styles.normal}>
      <Header />
      {children}
    </div>
  );
}

export default BasicLayout;
