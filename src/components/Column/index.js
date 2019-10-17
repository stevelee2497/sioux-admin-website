/* eslint-disable max-classes-per-file */
import React, { Component, PureComponent } from 'react';
import { Card, Button } from 'antd';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import styles from './index.less';
import Task from '../Task';
import { MODAL_TYPE } from '../../utils/constants';

class TasksContainer extends PureComponent {
  render() {
    const { tasks } = this.props;
    return tasks.map((task, taskIndex) => <Task key={task.id} task={task} index={taskIndex} />);
  }
}

class Column extends Component {
  render() {
    const { column, tasks, index, changeTaskModalState } = this.props;
    return (
      <Draggable draggableId={column.id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className={styles['col-wrapper']}
          >
            <Card
              style={{ borderRadius: 10, margin: 10, backgroundColor: '#ECECEC', width: 300, display: 'flex', maxHeight: '100%' }}
              bodyStyle={{ display: 'flex', flexDirection: 'column', padding: 10, width: '100%' }}
            >
              <h3 {...provided.dragHandleProps}>{column.name}</h3>
              <Droppable droppableId={column.id} type="task">
                {(colProvided) => (
                  <div
                    ref={colProvided.innerRef}
                    {...colProvided.droppableProps}
                    style={{ minHeight: 50, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}
                  >
                    <TasksContainer tasks={tasks} />
                    {colProvided.placeholder}
                    <div style={{ alignSelf: 'center' }}>
                      <Button
                        icon="plus"
                        shape="circle"
                        size="large"
                        onClick={() => changeTaskModalState(MODAL_TYPE.CREATE)}
                      />
                    </div>
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

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  changeTaskModalState: (modalType) => dispatch({
    type: 'modals/changeTaskModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Column);
