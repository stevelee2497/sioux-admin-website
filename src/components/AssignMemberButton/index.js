import React, { Component } from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Button, Avatar, Icon } from 'antd';
import _ from 'lodash';
import { parseImage } from '../../utils/images';

class AssignMemberButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  handleMenuClick = ({ key }) => {
    const { task: { id, taskAssignees }, employees, assignTask, unAssignTask, createTaskAction } = this.props;
    const taskAssignee = taskAssignees.find(item => item.userId === key);
    if (taskAssignee) {
      // remove member from task
      unAssignTask(taskAssignee.id);

      // attach an unassign action to this task
      const taskAction = {
        action: `removed \`${employees[key].fullName}\` from this task`,
        taskId: id
      };
      createTaskAction(taskAction);
    } else {
      // add member to task
      assignTask({ taskId: id, userId: key });

      // attach an assign action to this task
      const taskAction = {
        action: `assigned this task to \`${employees[key].fullName}\``,
        taskId: id
      };
      createTaskAction(taskAction);
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
        {_.map(members, member => (
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
  projects: { selectedProject: { users } },
  people: { employees }
}) => ({
  members: users,
  employees
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
  createTaskAction: (taskAction) => dispatch({
    type: 'tasks/createTaskAction',
    payload: taskAction
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(AssignMemberButton);
