import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Icon } from 'antd';
import styles from './index.less';

class AvatarPopoverContent extends Component {
  render() {
    const { logout, showProfile, profile } = this.props;
    return (
      <div className={styles.container}>
        <button type="button" className={styles.item} onClick={() => { showProfile(profile) ;}}>
          <Icon type="user" />
          <span>Profile</span>
        </button>
        <button type="button" className={styles.item}>
          <Icon type="setting" />
          <span>Setting</span>
        </button>
        <Divider className={styles.divider} />
        <button type="button" className={styles.item} onClick={logout}>
          <Icon type="logout" />
          <span>Logout</span>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.passport.profile
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'passport/logout' }),
  showProfile: profile => dispatch({
    type: 'people/selectEmployee',
    payload: profile
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AvatarPopoverContent);
