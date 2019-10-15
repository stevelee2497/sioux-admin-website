import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';

class ProjectFormModal extends Component {
  handleSubmit = () => {
    this.props.changeProjectModalState(MODAL_TYPE.CLOSED);
  }

  handleCancel = () => {
    this.props.changeProjectModalState(MODAL_TYPE.CLOSED);
  }

  render() {
    const { visible, form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Description">
            {getFieldDecorator('description')(<Input type="textarea" />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

const WrappedProjectForm = Form.create({ name: 'project_form' })(ProjectFormModal);

const mapStateToProps = ({
  modals: { projectModalVisible }
}) => ({
  visible: projectModalVisible
});

const mapDispatchToProps = dispatch => ({
  changeProjectModalState: (modalType) => dispatch({
    type: 'modals/changeProjectModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProjectForm);
