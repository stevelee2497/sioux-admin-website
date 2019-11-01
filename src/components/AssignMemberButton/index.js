import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Avatar } from 'antd';
import { parseImage } from '../../utils/images';

class AssignMemberButton extends Component {
  render() {
    const { members } = this.props;
    console.log(members);

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {members.map(member => (
          <Menu.Item key={member.id}>
            <Avatar src={parseImage(member.avatarUrl)} style={{ marginRight: 10 }} />
            {member.fullName}
          </Menu.Item>
        ))}
      </Menu>
    );

    return (
      <Dropdown
        overlay={menu}
        trigger={['click']}
      >
        <Button icon="plus" shape="circle" />
      </Dropdown>
    );
  }
}

const mapStateToProps = ({
  projects: { selectedProject: { users } }
}) => ({
  members: users
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(AssignMemberButton);
