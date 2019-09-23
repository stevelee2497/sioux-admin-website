import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import EmployeeInformation from './EmployeeInformation';
import { PROFILE_MODAL_TYPE } from '../../utils/constants';
import EmployeeForm from './EmployeeForm';

class EmployeeProfileModal extends Component {
  constructor(props) {
    super(props);
    this.employeeForm = createRef();
  }

  handleOk = () => {
    const { closeModal, profileModalType, updateEmployeeProfile } = this.props;
    if (profileModalType === PROFILE_MODAL_TYPE.VIEW) {
      closeModal();
    } else {
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          updateEmployeeProfile(values);
        }
    });
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeProfileModal);
