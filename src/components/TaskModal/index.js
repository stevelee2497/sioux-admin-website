import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button, Tag, Icon, Avatar } from 'antd';
import faker from 'faker';
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
    const { name, value } = e.target;
    const { task, updateTask } = this.props;
    switch (name) {
      case 'title':
      case 'description':
        updateTask({ ...task, [name]: value });
        break;
      case 'comment':
        break;
      default:
        break;
    }
    console.log({ name, value });
  }

  renderMembers = () => Array.from({ length: 2 }).map(item => (
    <Avatar src={faker.image.avatar()} key={faker.random.uuid()} style={{ marginRight: 2 }} />
  ))

  render() {
    const { visible, task } = this.props;
    if (!task) {
      return null;
    }

    return (
      <Modal
        visible={visible}
        footer={null}
        onCancel={this.handleCancel}
        bodyStyle={{ padding: 15, display: 'flex', flexDirection: 'column' }}
        width={720}
      >
        <div className={styles.block}>
          <Icon className={styles.icon} type="book" />
          <Input.TextArea
            name="title"
            onBlur={this.handleOnBlur}
            autosize
            defaultValue={task.title}
            className={styles.title}
          />
        </div>
        <div style={{ marginLeft: 36, marginTop: 2 }}>
          <div>
            status:
            <Tag color="#448aff" style={{ marginLeft: 10 }}>To do</Tag>
          </div>
          <div style={{ fontWeight: 500, marginTop: 20, display: 'flex', flexDirection: 'column' }}>
            MEMBERS
            <div style={{ display: 'flex' }}>
              {this.renderMembers()}
              <Button icon="plus" shape="circle" />
            </div>
          </div>
        </div>
        <div className={styles.block} style={{ marginTop: 30 }}>
          <Icon className={styles.icon} type="align-left" />
          <h3 style={{ margin: 0, marginLeft: 5 }}>Description</h3>
        </div>
        <div style={{ display: 'flex', marginRight: 25 }}>
          <Input.TextArea
            name="description"
            onBlur={this.handleOnBlur}
            autosize={{ minRows: 6 }}
            defaultValue={task.description}
            className={styles.description}
          />
        </div>
        <div className={styles.block} style={{ marginTop: 30 }}>
          <Icon className={styles.icon} type="message" />
          <h3 style={{ margin: 0, marginLeft: 5 }}>Comments</h3>
        </div>
        <div style={{ display: 'flex', marginRight: 25, marginTop: 10 }}>
          <div>
            <Avatar src={faker.image.avatar()} />
          </div>
          <Input.TextArea
            name="comment"
            onBlur={this.handleOnBlur}
            autosize={{ minRows: 2 }}
            defaultValue={task.description}
            className={styles.comment}
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
  }),
  updateTask: task => dispatch({
    type: 'tasks/updateTask',
    payload: task
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);
