import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Divider } from 'antd';

import styles from './index.less';

 class EmployeeProfileModal extends Component {
  render() {
    const {
      people: { modalVisible, selectedEmployee },
      closeModal
    } = this.props;

    return (
      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={closeModal}
        width={800}
        bodyStyle={{ display: 'flex' }}
        title="Employee Profile"
      >
        <div className={styles.left}>
          <img
            alt={`${selectedEmployee.name} profile`}
            src={selectedEmployee.avatar}
            onError={(e) => { e.target.onerror = null; e.target.src = '/assets/default_avatar.png'; }}
          />

          <div className={styles.skills}>
            <div className={styles.title}>
              <h3>SKILLS</h3>
              <Divider className={styles.divider} />
            </div>
            {selectedEmployee.skills.map((skill) => <h4 key={skill}>{skill}</h4>)}
          </div>
        </div>
        <div className={styles.right}>foo</div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch({ type: 'people/closeModal' })
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProfileModal);
