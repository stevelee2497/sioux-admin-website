import React, { Component } from 'react';
import { Card, Avatar, Tag, Button, Icon, Dropdown, Menu } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import { parseImage } from '../../utils/images';
import styles from './index.less';

class Task extends Component {
  renderLabels = () => {
    const { labels, task: { taskLabels } } = this.props;
    return taskLabels.map(item => {
      const label = labels[item.labelId];
      return label && (
        <Tag key={label.id} color={label.color} style={{ marginRight: 3, marginBottom: 3 }}>
          {label.name}
        </Tag>
      );
    });
  }

  renderMembers = () => {
    const { employees, task: { taskAssignees } } = this.props;
    return taskAssignees.map(item => {
      const member = employees[item.userId];
      return member && (
        <Avatar
          src={parseImage(member.avatarUrl)}
          key={member.id}
          style={{ marginRight: 2 }}
        >
          {member.fullName.match(/\b\w/g).join('')}
        </Avatar>
      );
    });
  }

  handleMenuClicked = ({ key }) => {
    const { deleteTask, task } = this.props;
    switch (key) {
      case 'Delete':
        deleteTask(task.id);
        break;
      default:
        break;
    }
  }

  render() {
    const { task, index, showTask } = this.props;

    const menu = (
      <Menu onClick={this.handleMenuClicked}>
        <Menu.Item key="Delete">
          Delete
        </Menu.Item>
      </Menu>
    );

    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
            className={styles.taskCard}
          >
            <Card
              hoverable
              size="small"
              onClick={() => showTask(task.id)}
            >
              {this.renderLabels()}
              <h4 style={{ margin: 0 }}>{task.title}</h4>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {this.renderMembers()}
              </div>
            </Card>
            <Dropdown overlay={menu} trigger={['click']} className={styles.taskConfig}>
              <Button
                icon="more"
                size="small"
              />
            </Dropdown>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = ({
  projects: { selectedProject: { users: employees } },
  labels,
}) => ({
  employees,
  labels,
});

const mapDispatchToProps = dispatch => ({
  showTask: (taskId) => dispatch({
    type: 'modals/showTask',
    payload: taskId
  }),
  deleteTask: (taskId) => dispatch({
    type: 'tasks/deleteTask',
    payload: taskId
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
