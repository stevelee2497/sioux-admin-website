import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Icon } from 'antd';
import Link from 'umi/link';
import styles from './index.less';

class AvatarPopoverContent extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link to="/">
          <Icon type="user" />
          <span>Profile</span>
        </Link>
        <Link to="/">
          <Icon type="setting" />
          <span>Setting</span>
        </Link>
        <Divider className={styles.divider} />
        <Link to="/">
          <Icon type="logout" />
          <span>Logout</span>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarPopoverContent);
