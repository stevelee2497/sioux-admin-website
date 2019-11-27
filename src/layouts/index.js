import React from 'react';
import styles from './index.less';
import Header from '../components/Header';
import EmployeeProfileModal from '../components/EmployeeProfileModal';
import TaskModal from '../components/TaskModal';

function BasicLayout({ children, location }) {
  if (location.pathname.toLowerCase() === '/login') {
    return <div className={styles.normal}>{children}</div>;
  }

  return (
    <div className={styles.normal}>
      <Header />
      {children}
      <EmployeeProfileModal />
      <TaskModal />
    </div>
  );
}

export default BasicLayout;
