/* eslint-disable max-classes-per-file */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import initialData from './data';

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

class Column extends Component {
  render() {
    const { column, tasks, index } = this.props;
    return (
      <Draggable draggableId={column.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <Card
              style={{ margin: 10, borderRadius: 10, overflow: 'hidden', backgroundColor: 'whitesmoke', display: 'table', width: 300 }}
              bodyStyle={{ display: 'flex', flexDirection: 'column', padding: 10 }}
            >
              <h3 {...provided.dragHandleProps}>{column.title}</h3>
              <Droppable droppableId={column.id} type="task">
                {(colProvided) => (
                  <div
                    style={{ minHeight: 100 }}
                    ref={colProvided.innerRef}
                    {...colProvided.droppableProps}
                  >
                    {tasks.map((task, taskIndex) => <Task key={task.id} task={task} index={taskIndex} />)}
                    {colProvided.placeholder}
                  </div>
                )}
              </Droppable>
            </Card>
          </div>
        )}
      </Draggable>
    );
  }
}

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = initialData;
  }

  onDragEnd = result => {
    const { columns, columnOrder } = this.state;
    const { draggableId, source, destination, type } = result;

    // users drag the task outside the columns
    if (!destination) {
      return;
    }

    // users drag and drop the object (tasks or columns) to its current position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    // if users drag and drop the columns, set columnOrder to new state and return
    if (type === 'column') {
      const newColOrder = [...columnOrder];
      newColOrder.splice(source.index, 1);
      newColOrder.splice(destination.index, 0, draggableId);
      this.setState({ columnOrder: newColOrder });
      return;
    }

    // remove the id of the dragged task from the source column
    const sourceCol = columns[source.droppableId];
    const newSourceColTaskIds = [...sourceCol.taskIds];
    newSourceColTaskIds.splice(source.index, 1);
    const newSourceCol = {
      ...sourceCol,
      taskIds: newSourceColTaskIds
    };

    // add the dragged task to the destination column
    const destinationCol = source.droppableId === destination.droppableId ? newSourceCol : columns[destination.droppableId];
    const newDestinationColTaskIds = [...destinationCol.taskIds];
    newDestinationColTaskIds.splice(destination.index, 0, draggableId);
    const newDestinationCol = {
      ...destinationCol,
      taskIds: newDestinationColTaskIds
    };

    // update state
    this.setState((state) => ({
      ...state,
      columns: {
        ...state.columns,
        [newSourceCol.id]: newSourceCol,
        [newDestinationCol.id]: newDestinationCol
      }
    }));
  }

  render() {
    const { columns, columnOrder, tasks } = this.state;
    return (
      <div style={{ backgroundColor: 'white', overflowY: 'hidden' }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="table-id" direction="horizontal" type="column">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ display: 'flex', flex: 1, flexDirection: 'row' }}
              >
                {columnOrder.map((id, index) => {
                  const column = columns[id];
                  const colTasks = column.taskIds.map(taskId => tasks[taskId]);
                  return <Column key={id} column={column} tasks={colTasks} index={index} />;
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
