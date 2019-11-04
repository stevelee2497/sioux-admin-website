import React, { Component } from 'react';
import { Card, Avatar } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import { parseImage } from '../../utils/images';

class Task extends Component {
  renderMembers = () => {
    const { employees, task: { taskAssignees } } = this.props;
    return taskAssignees.map(item => {
      const member = employees[item.userId];
      return (
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

  render() {
    const { task, index, showTask } = this.props;
    return (
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            {...provided.dragHandleProps}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Card
              style={{ marginBottom: 5 }}
              hoverable
              size="small"
              onClick={() => showTask(task.id)}
            >
              <h4 style={{ margin: 0 }}>{task.title}</h4>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {this.renderMembers()}
              </div>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = ({
  people: { employees }
}) => ({
  employees
});

const mapDispatchToProps = dispatch => ({
  showTask: (taskId) => dispatch({
    type: 'modals/showTask',
    payload: taskId
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
