import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Avatar, Icon } from 'antd';
import { parseImage } from '../../utils/images';

class AssignMemberButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleMenuClick = ({ key }) => {
    const { task: { id, taskAssignees }, assignTask, unAssignTask } = this.props;
    const taskAssignee = taskAssignees.find(item => item.userId === key);
    if (taskAssignee) {
      // remove member from task
      unAssignTask(taskAssignee.id);
    } else {
      // add member to task
      assignTask({ taskId: id, userId: key });
    }
  }

  handleVisibleChange = flag => {
    this.setState({ visible: flag });
  };

  render() {
    const { members, task: { taskAssignees } } = this.props;
    const { visible } = this.state;

    const menu = (
      <Menu onClick={this.handleMenuClick}>
        {members.map(member => (
          <Menu.Item key={member.userId} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Avatar src={parseImage(member.avatarUrl)} style={{ marginRight: 10 }} />
              {member.fullName}
            </div>
            {taskAssignees.some(item => item.userId === member.userId) ? <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ marginLeft: 10 }} /> : null}
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
  }),
  unAssignTask: (id) => dispatch({
    type: 'tasks/unAssignTask',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignMemberButton);
