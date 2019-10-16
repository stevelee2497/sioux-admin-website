/* eslint-disable max-classes-per-file */
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Button } from 'antd';
import initialData from './data';
import Column from '../../components/Column';
import ProjectMenu from '../../components/ProjectMenu';
import BoardHeader from '../../components/BoardHeader';
import TaskModal from '../../components/TaskModal';
import ProjectForm from '../../components/ProjectForm';
import CreateColumnButton from '../../components/CreateColumnButton';

class ColumnsContainer extends PureComponent {
  render() {
    const { column, tasks, index } = this.props;
    const colTasks = column.taskIds.map(taskId => tasks[taskId]);
    return (<Column column={column} tasks={colTasks} index={index} />);
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
      <div style={{ display: 'flex', flex: 1, overflowY: 'hidden' }}>
        <ProjectMenu />
        <div style={{ display: 'flex', flex: 1, overflowY: 'hidden' }}>
          <div style={{ backgroundColor: 'white', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <BoardHeader />
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="table-id" direction="horizontal" type="column">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ display: 'flex', flex: 1, flexDirection: 'row', height: '100%', alignItems: 'flex-start' }}
                  >
                    {columnOrder.map((id, index) => {
                      const column = columns[id];
                      return <ColumnsContainer key={id} column={column} tasks={tasks} index={index} />;
                    })}
                    {provided.placeholder}
                    <CreateColumnButton />
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>

        {/* Register Modals */}
        <ProjectForm />
        <TaskModal />
      </div>
    );
  }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
