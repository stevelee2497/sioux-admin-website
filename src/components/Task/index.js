import React, { Component } from 'react';
import { Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'dva';
import { MODAL_TYPE } from '../../utils/constants';

class Task extends Component {
  render() {
    const { task, index, changeTaskModalState } = this.props;
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
              onClick={() => changeTaskModalState(MODAL_TYPE.CREATE)}
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
  changeTaskModalState: (modalType) => dispatch({
    type: 'modals/changeTaskModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(Task);
