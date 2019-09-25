import React from 'react';
import styles from './index.less';

const Avatar = ({ name, src }) => (
  <img
    className={styles.avatar}
    alt={`${name} profile`}
    src={src || '/assets/default_avatar.png'}
    onError={e => {
      e.target.onerror = null;
      e.target.src = '/assets/default_avatar.png';
    }}
  />
);

export default Avatar;
