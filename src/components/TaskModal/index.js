import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Input, Button, Tag, Icon, Avatar } from 'antd';
import faker from 'faker';
import moment from 'moment';
import { MODAL_TYPE } from '../../utils/constants';
import styles from './index.less';
import { timeHelper } from '../../helpers/timeHelper';
import { parseImage } from '../../utils/images';
import TaskLabels from '../TaskLabels';
import TaskMembers from '../TaskMembers';

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
        if (task[name] !== value) {
          updateTask({ ...task, [name]: value });
        }
        break;
      case 'estimation':
        if (task[name] !== timeHelper.toTimeSpan(value)) {
          updateTask({ ...task, [name]: timeHelper.toTimeSpan(value) });
        }
        break;
      case 'comment':
        break;
      default:
        break;
    }
  }

  renderActivities = (task) => Array.from({ length: 2 }).map(() => (
    <div key={faker.random.uuid()} style={{ display: 'flex', marginRight: 25, marginTop: 10, alignItems: 'center' }}>
      <Avatar style={{ marginTop: 10 }} src={faker.image.avatar()} />
      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 5, fontSize: 13 }}>
        <div>
          <Button type="link" style={{ padding: 0, marginRight: 5 }}>
            <h4 style={{ margin: 0 }}>Quoc Tran</h4>
          </Button>
          has created this task
        </div>
        <p style={{ marginTop: -3, marginBottom: 0 }}>{moment(task.createdTime).format('DD/MM/YYYY HH:mm')}</p>
      </div>
    </div>
  ))

  render() {
    const { visible, task, profile: { avatarUrl } } = this.props;
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
          <Icon className={styles.icon} style={{ marginTop: 12 }} type="book" />
          <Input.TextArea
            name="title"
            onBlur={this.handleOnBlur}
            autosize
            defaultValue={task.title}
            className={styles.title}
          />
        </div>
        <div style={{ marginLeft: 36, marginTop: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            status:
            <Tag color="#448aff" style={{ marginLeft: 10 }}>To do</Tag>
            <TaskLabels task={task} />
          </div>
          <TaskMembers />
        </div>
        <div className={styles.block} style={{ marginTop: 30 }}>
          <Icon className={styles.icon} type="clock-circle" />
          <div style={{ display: 'flex', flex: 1, marginTop: -3 }}>
            <div style={{ marginLeft: 5, display: 'flex', flex: 1, alignItems: 'baseline' }}>
              <h3 style={{ margin: 0 }}>Estimate:</h3>
              <Input
                name="estimation"
                onBlur={this.handleOnBlur}
                className={styles.estimation}
                defaultValue={timeHelper.toString(task.estimation)}
              />
            </div>
            <div style={{ marginLeft: 5, display: 'flex', flex: 1, alignItems: 'baseline', marginTop: 2 }}>
              <h3 style={{ margin: 0 }}>Spent:</h3>
              <div className={styles.estimation}>0h</div>
            </div>
            <div style={{ marginLeft: 5, display: 'flex', flex: 1, alignItems: 'baseline', marginTop: 2 }}>
              <h3 style={{ margin: 0 }}>Remaining:</h3>
              <div className={styles.estimation}>{timeHelper.toString(task.estimation)}</div>
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
            placeholder="Add a description ..."
          />
        </div>
        <div className={styles.block} style={{ marginTop: 30 }}>
          <Icon className={styles.icon} type="message" />
          <h3 style={{ margin: 0, marginLeft: 5 }}>Comments</h3>
        </div>
        <div style={{ display: 'flex', marginRight: 25, marginTop: 10 }}>
          <Avatar src={parseImage(avatarUrl)} />
          <Input.TextArea
            name="comment"
            onBlur={this.handleOnBlur}
            autosize={{ minRows: 2 }}
            defaultValue={task.description}
            className={styles.comment}
            placeholder="Add a comment ..."
          />
        </div>
        <div className={styles.block} style={{ marginTop: 30 }}>
          <Icon className={styles.icon} type="thunderbolt" />
          <h3 style={{ margin: 0, marginLeft: 5, marginTop: 3 }}>Activities</h3>
        </div>
        {this.renderActivities(task)}
      </Modal>
    );
  }
}

const mapStateToProps = ({
  modals: { taskModalVisible, task },
  people: { employees },
  passport: { profile }
}) => ({
  visible: taskModalVisible,
  task,
  employees,
  profile
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
