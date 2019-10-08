import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Popover } from 'antd';
import styles from './index.less';
import images from '../../utils/images';
import AvatarPopoverContent from '../AvatarPopoverContent';

const navItems = [
  { link: '/', title: 'HOME' },
  { link: '/People', title: 'PEOPLE' },
  { link: '/Leaves', title: 'LEAVES' },
  { link: '/Boards', title: 'BOARDS' },
  { link: '/TimeSheets', title: 'TIME SHEETS' },
];

class Header extends Component {
  renderNavItems = () => {
    const {
      location: { pathname },
    } = this.props;

    return navItems.map(item => (
      <Link
        to={item.link}
        className={pathname === item.link ? styles.navItemSelected : styles.navItem}
        key={item.link}
      >
        {item.title}
      </Link>
    ));
  };

  render() {
    const { profile } = this.props;
    return (
      <div className={styles.container}>
        <div>
          <Link to="/" className={styles.navItem}>
            <img alt="sioux logo" src={images.logo} className={styles.logo} />
          </Link>
          {this.renderNavItems()}
        </div>
        <div>
          Hello,
          <Link to="/">{profile.fullName}</Link>
          <Popover
            placement="bottomRight"
            trigger="hover"
            content={<AvatarPopoverContent />}
          >
            <img
              alt="avatar"
              src={profile.avatarUrl}
              className={styles.avatar}
              onError={(e) => { e.target.onerror = null; e.target.src = '/assets/default_avatar.png'; }}
            />
          </Popover>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
  profile: state.passport.profile
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
