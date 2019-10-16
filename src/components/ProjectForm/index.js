import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Input } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';
import UploadImage from '../UploadImage';
import FormItem from '../FormItem';

class ProjectFormModal extends Component {
  handleSubmit = () => {
    this.props.changeProjectModalState(MODAL_TYPE.CLOSED);
  }

  handleCancel = () => {
    this.props.changeProjectModalState(MODAL_TYPE.CLOSED);
  }

  render() {
    const { visible, modalType, form: { getFieldDecorator } } = this.props;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        width={600}
      >
        <Form hideRequiredMark style={{ display: 'flex', paddingLeft: 20, paddingRight: 20 }}>
          <FormItem
            value="imageUrl"
            initialValue=""
            component={<UploadImage size={145} modalType={modalType} />}
            getFieldDecorator={getFieldDecorator}
          />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: -4 }}>
            <FormItem
              getFieldDecorator={getFieldDecorator}
              value="name"
              initialValue=""
              component={<Input placeholder="Board Name" />}
              required
            />
            <FormItem
              getFieldDecorator={getFieldDecorator}
              value="description"
              initialValue=""
              component={<Input.TextArea placeholder="Description" type="textarea" rows={7} />}
            />
          </div>
        </Form>
      </Modal>
    );
  }
}

const WrappedProjectForm = Form.create({ name: 'project_form' })(ProjectFormModal);

const mapStateToProps = ({
  modals: { projectModalVisible, modalType }
}) => ({
  visible: projectModalVisible,
  modalType
});

const mapDispatchToProps = dispatch => ({
  changeProjectModalState: (modalType) => dispatch({
    type: 'modals/changeProjectModalState',
    payload: modalType
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProjectForm);
