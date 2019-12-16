import React, { Component } from 'react';
import { connect } from 'dva';
import { Popover } from 'antd';
import styles from './index.less';
import images, { parseImage } from '../../utils/images';
import AvatarPopoverContent from '../AvatarPopoverContent';

const navItems = [
  { link: '/#/People', title: 'PEOPLE' },
  { link: '/#/Boards', title: 'BOARDS' },
  { link: '/#/TimeSheets', title: 'TIME SHEETS' },
];

class Header extends Component {
  renderNavItems = () => {
    const {
      location: { pathname },
    } = this.props;

    return navItems.map(item => (
      <a
        href={item.link}
        className={pathname === item.link ? styles.navItemSelected : styles.navItem}
        key={item.link}
      >
        {item.title}
      </a>
    ));
  };

  render() {
    const { profile } = this.props;
    return (
      <div className={styles.container}>
        <div>
          <a href="/#/People" className={styles.navItem}>
            <img alt="sioux logo" src={images.logo} className={styles.logo} />
          </a>
          {this.renderNavItems()}
        </div>
        <div>
          Hello,
          <a href="/#/People">{profile.fullName}</a>
          <Popover
            placement="bottomRight"
            trigger="hover"
            content={<AvatarPopoverContent />}
          >
            <img
              alt="avatar"
              src={parseImage(profile.avatarUrl)}
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
