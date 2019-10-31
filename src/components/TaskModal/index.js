import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button, Tag, Icon } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';
import styles from './index.less';

class TaskModal extends Component {
  handleSubmit = () => {
    this.props.changeTaskModalState(MODAL_TYPE.CLOSED);
  }

  handleCancel = () => {
    this.props.changeTaskModalState(MODAL_TYPE.CLOSED);
  }

  handleOnBlur = e => {
    console.log(e.target);
  }

  render() {
    const { visible, task } = this.props;
    if (!task) {
      return null;
    }

    console.log(task);

    return (
      <Modal
        visible={visible}
        footer={null}
        onCancel={this.handleCancel}
        bodyStyle={{ padding: 15, display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ fontSize: 20, marginRight: 5 }} type="book" />
          <Input.TextArea
            name="title"
            onBlur={this.handleOnBlur}
            autosize
            defaultValue={task.title}
            className={styles.title}
          />
        </div>
        <div style={{ marginLeft: 32, marginTop: 2 }}>
          <div>
            status:
            <Tag color="#448aff" style={{ marginLeft: 10 }}>To do</Tag>
          </div>
          ádf
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 30 }}>
          <Icon style={{ fontSize: 20, marginRight: 5 }} type="align-left" />
          <h3 style={{ margin: 0, marginLeft: 5 }}>Description</h3>
        </div>
        <div style={{ display: 'flex' }}>
          <Input.TextArea
            name="description"
            onBlur={this.handleOnBlur}
            autosize
            defaultValue={task.description}
            className={styles.description}
          />
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({
  modals: { taskModalVisible, taskId },
  tasks
}) => ({
  visible: taskModalVisible,
  task: tasks[taskId]
});

const mapDispatchToProps = dispatch => ({
  changeTaskModalState: (modalType, taskId) => dispatch({
    type: 'modals/changeTaskModalState',
    payload: { modalType, taskId }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
