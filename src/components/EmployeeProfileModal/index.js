import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import EmployeeInformation from './EmployeeInformation';

class EmployeeProfileModal extends Component {
  render() {
    const { modalVisible, closeModal } = this.props;

    return modalVisible && (
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        onOk={closeModal}
        width={1000}
        title="Employee Profile"
      >
        <EmployeeInformation />
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.people.modalVisible,
  profile: state.passport.profile,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch({
    type: 'people/closeModal',
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeProfileModal);
