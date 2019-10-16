import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Modal, Input } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';

class TaskModal extends Component {
  handleSubmit = () => {
    this.props.changeTaskModalState(MODAL_TYPE.CLOSED);
  }

  handleCancel = () => {
    this.props.changeTaskModalState(MODAL_TYPE.CLOSED);
  }

  renderForm = () => {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description')(<Input type="textarea" />)}
        </Form.Item>
      </Form>
    );
  }

  render() {
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        title="Task Modal"
        okText="Create"
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        {this.renderForm()}
      </Modal>
    );
  }
}

const WrappedTaskModal = Form.create({ name: 'task_form' })(TaskModal);

const mapStateToProps = ({
  modals: { taskModalVisible }
}) => ({
  visible: taskModalVisible
});

const mapDispatchToProps = dispatch => ({
  changeTaskModalState: (modalType) => dispatch({
    type: 'modals/changeTaskModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedTaskModal);
