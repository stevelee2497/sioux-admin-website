import React, { Component } from 'react';
import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

class Task extends Component {
  render() {
    const { task, index } = this.props;
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

export default Task;
