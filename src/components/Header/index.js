import React, { Component } from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Popover } from 'antd';
import styles from './index.less';
import images from '../../utils/images';
import AvatarPopoverContent from '../AvatarPopoverContent';

const navItems = [
  { link: '/Home', title: 'HOME' },
  { link: '/People', title: 'PEOPLE' },
  { link: '/Leaves', title: 'LEAVES' },
  { link: '/Boards', title: 'BOARDS' },
  { link: '/TimeSheets', title: 'TIME SHEETS' },
];

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarPopOverVisible: true
    };
  }

  handleVisibleChange = (avatarPopOverVisible) => {
    this.setState({ avatarPopOverVisible });
  };

  renderNavItems = () => navItems.map((item) => (
    <Link to={item.link} className={styles.navItem}>
      {item.title}
    </Link>
  ))

  render() {
    const { avatarPopOverVisible } = this.state;
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
          <Link to="/">Quoc Tran</Link>
          <Popover
            visible={avatarPopOverVisible}
            onVisibleChange={this.handleVisibleChange}
            placement="bottomRight"
            trigger="hover"
            content={(<AvatarPopoverContent />)}
          >
            <Link to="/">
              <img alt="avatar" src="http://media2.sieuhai.tv:8088/onbox/images/user_lead_image/20190408/84947430634_20190408001343.jpg" className={styles.avatar} />
            </Link>
          </Popover>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
