import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Avatar } from 'antd';
import { parseImage } from '../../utils/images';

class AssignMemberButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleMenuClick = ({ key }) => {
    const { taskId, assignTask } = this.props;
    assignTask({ taskId, userId: key });
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const { members } = this.props;
    const { visible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {members.map(member => (
          <Menu.Item key={member.userId}>
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
        onVisibleChange={this.handleVisibleChange}
        visible={visible}
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

const mapDispatchToProps = dispatch => ({
  assignTask: (taskAssignee) => dispatch({
    type: 'tasks/assignTask',
    payload: taskAssignee
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignMemberButton);
