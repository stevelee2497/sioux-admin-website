/* eslint-disable max-classes-per-file */
import React, { Component, PureComponent } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { Spin, Empty } from 'antd';
import initialData from './data';
import Column from '../../components/Column';
import ProjectMenu from '../../components/ProjectMenu';
import BoardHeader from '../../components/BoardHeader';
import TaskModal from '../../components/TaskModal';
import ProjectForm from '../../components/ProjectForm';
import CreateColumnButton from '../../components/CreateColumnButton';
import LabelModal from '../../components/LabelModal';

class ColumnContainer extends PureComponent {
  render() {
    const { column, tasks, index } = this.props;
    if (!column) {
      return null;
    }

    const colTasks = column.taskOrder.map(taskId => tasks[taskId]);
    return (<Column column={column} tasks={colTasks} index={index} />);
  }
}

class Boards extends Component {
  constructor(props) {
    super(props);
    this.state = initialData;
  }

  onDragEnd = result => {
    const { columns, selectedProject, updateProject, updatePhase } = this.props;
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
      const newColOrder = [...selectedProject.phaseOrder];
      newColOrder.splice(source.index, 1);
      newColOrder.splice(destination.index, 0, draggableId);
      updateProject({ ...selectedProject, phaseOrder: newColOrder });
      return;
    }

    // remove the id of the dragged task from the source column
    const sourceCol = columns[source.droppableId];
    const newSourceColTaskIds = [...sourceCol.taskOrder];
    newSourceColTaskIds.splice(source.index, 1);
    const newSourceCol = {
      ...sourceCol,
      taskOrder: newSourceColTaskIds
    };

    // add the dragged task to the destination column
    const destinationCol = source.droppableId === destination.droppableId ? newSourceCol : columns[destination.droppableId];
    const newDestinationColTaskIds = [...destinationCol.taskOrder];
    newDestinationColTaskIds.splice(destination.index, 0, draggableId);
    const newDestinationCol = {
      ...destinationCol,
      taskOrder: newDestinationColTaskIds
    };

    // update phase
    if (newSourceCol.id !== newDestinationCol.id) {
      updatePhase(newSourceCol);
    }
    updatePhase(newDestinationCol);
  }

  renderBoard = () => {
    const { columns, selectedProject, tasks } = this.props;
    if (!selectedProject) {
      return (
        <Empty style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          paddingBottom: 100
        }}
        />
      );
    }

    const { phaseOrder: columnOrder } = selectedProject;
    return (
      <div style={{ display: 'flex', flex: 1, overflowY: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
                    return <ColumnContainer key={id} column={column} tasks={tasks} index={index} />;
                  })}
                  {provided.placeholder}
                  <CreateColumnButton />
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }

  renderSpin = () => (<Spin style={{ backgroundColor: 'white', flex: 1, paddingTop: 300 }} size="large" />);

  render() {
    const { loading } = this.props;
    return (
      <div style={{ display: 'flex', flex: 1, backgroundColor: 'white', overflowY: 'hidden' }}>
        <ProjectMenu />
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflowY: 'hidden' }}>
          <BoardHeader />
          {loading ? this.renderSpin() : this.renderBoard()}
        </div>
        {/* Register Modals */}
        <ProjectForm />
        <TaskModal />
        <LabelModal />
      </div>
    );
  }
}

const mapStateToProps = ({
  loading: { effects },
  tasks,
  phases,
  projects: { selectedProject }
}) => ({
  loading: effects['projects/fetchProject'],
  tasks,
  columns: phases,
  selectedProject,
});

const mapDispatchToProps = dispatch => ({
  updateProject: (project) => dispatch({
    type: 'projects/updateProject',
    payload: project
  }),
  updatePhase: (phase) => dispatch({
    type: 'phases/updatePhase',
    payload: phase
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Boards);
