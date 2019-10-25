import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import EmployeeInformation from './EmployeeInformation';
import { PROFILE_MODAL_TYPE } from '../../utils/constants';
import EmployeeForm from './EmployeeForm';

class EmployeeProfileModal extends Component {
  submitForm = (action) => {
    const { selectedEmployee } = this.props;
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        action({ ...selectedEmployee, ...values });
      }
    });
  }

  handleOk = () => {
    const { closeModal, profileModalType, updateEmployeeProfile, createEmployee } = this.props;
    switch (profileModalType) {
      case PROFILE_MODAL_TYPE.VIEW:
        closeModal();
        break;
      case PROFILE_MODAL_TYPE.EDIT:
        this.submitForm(updateEmployeeProfile);
        break;
      case PROFILE_MODAL_TYPE.CREATE:
        this.submitForm(createEmployee);
        break;
      default:
        break;
    }
  }

  // this is the only way to create ref with the form that created by Form.create() in antd.
  // Read more at https://github.com/react-component/form#note-use-wrappedcomponentref-instead-of-withref-after-rc-form140
  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { modalVisible, closeModal, profileModalType } = this.props;

    return modalVisible && (
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        onOk={this.handleOk}
        width={1000}
        title="Employee Profile"
      >
        {profileModalType === PROFILE_MODAL_TYPE.VIEW ? <EmployeeInformation /> : <EmployeeForm wrappedComponentRef={this.saveFormRef} />}
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.people.modalVisible,
  profileModalType: state.people.profileModalType,
  selectedEmployee: state.people.selectedEmployee,
  profile: state.passport.profile,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch({
    type: 'people/closeModal',
  }),
  updateEmployeeProfile: values => dispatch({
    type: 'people/updateEmployeeProfile',
    payload: values
  }),
  createEmployee: values => dispatch({
    type: 'people/createEmployee',
    payload: values
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeProfileModal);
