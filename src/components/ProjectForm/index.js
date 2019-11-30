import React, { Component } from 'react';
import { connect } from 'dva';
import { Modal, Form, Input, Spin } from 'antd';
import { MODAL_TYPE } from '../../utils/constants';
import UploadImage from '../UploadImage';
import FormItem from '../FormItem';

class ProjectFormModal extends Component {
  handleSubmit = () => {
    const { form: { validateFields, resetFields }, createBoard, updateProject, modalType, project } = this.props;
    validateFields((err, values) => {
      if (!err) {
        switch (modalType) {
          case MODAL_TYPE.CREATE:
            createBoard(values);
            break;
          case MODAL_TYPE.EDIT:
            updateProject({ ...project, ...values });
            resetFields();
            break;
          default:
            break;
        }
      }
    });
  }

  handleCancel = () => {
    this.props.changeProjectModalState(MODAL_TYPE.CLOSED);
  }

  render() {
    const { visible, modalType, loading, form: { getFieldDecorator }, project } = this.props;
    const initFormValue = modalType === MODAL_TYPE.EDIT ? project : {
      imageUrl: '',
      key: '',
      name: '',
      description: ''
    };

    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText={modalType === MODAL_TYPE.CREATE ? 'Create' : 'Update'}
        onCancel={this.handleCancel}
        onOk={this.handleSubmit}
        width={600}
        confirmLoading={loading}
      >
        <Spin spinning={loading}>
          <Form hideRequiredMark style={{ display: 'flex', paddingLeft: 20, paddingRight: 20 }}>
            <FormItem
              value="imageUrl"
              initialValue={initFormValue.imageUrl}
              component={<UploadImage size={145} modalType={modalType} category="board" />}
              getFieldDecorator={getFieldDecorator}
            />
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginTop: -4 }}>
              <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, marginRight: 5 }}>
                  <FormItem
                    getFieldDecorator={getFieldDecorator}
                    value="name"
                    initialValue={initFormValue.name}
                    component={<Input placeholder="Board Name" />}
                    required
                  />
                </div>
                <FormItem
                  getFieldDecorator={getFieldDecorator}
                  value="key"
                  initialValue={initFormValue.key}
                  component={<Input placeholder="Board Key" style={{ width: 100 }} />}
                  required
                />
              </div>
              <FormItem
                getFieldDecorator={getFieldDecorator}
                value="description"
                initialValue={initFormValue.description}
                component={<Input.TextArea placeholder="Description" type="textarea" rows={7} />}
              />
            </div>
          </Form>
        </Spin>
      </Modal>
    );
  }
}

const WrappedProjectForm = Form.create({ name: 'project_form' })(ProjectFormModal);

const mapStateToProps = ({
  modals: { projectModalVisible, modalType },
  loading: { global },
  projects: { selectedProject }
}) => ({
  visible: projectModalVisible,
  modalType,
  loading: global,
  project: selectedProject
});

const mapDispatchToProps = dispatch => ({
  changeProjectModalState: (modalType) => dispatch({
    type: 'modals/changeProjectModalState',
    payload: modalType
  }),
  createBoard: (board) => dispatch({
    type: 'projects/createBoard',
    payload: board
  }),
  updateProject: (board) => dispatch({
    type: 'projects/updateProject',
    payload: board
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(WrappedProjectForm);
