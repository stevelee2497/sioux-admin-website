import React, { Component } from 'react';
import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';

class Task extends Component {
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
              <h4>{task.title}</h4>
              {task.content}
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  showTask: (taskId) => dispatch({
    type: 'modals/showTask',
    payload: taskId
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
