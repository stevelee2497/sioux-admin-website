import React, { Component } from 'react';
import { connect } from 'dva';
import { Divider, Tabs, Row, Col, Timeline, Button } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { ROLE, PROFILE_MODAL_TYPE } from '../../utils/constants';
import TabIcon from './TabIcon';
import EmployeeSkills from '../EmployeeSkills';
import EmployeeTimeline from '../EmployeeTimeline';
import UploadImage from '../UploadImage';

const CRow = ({ title, value }) => (
  <Row>
    <Col span={6}>
      <h4>{title}:</h4>
    </Col>
    <Col span={18}>
      <h4 className={styles.rowValue}>{value}</h4>
    </Col>
  </Row>
);

const EditProfileButton = ({ onEdit, visible }) => visible && (
  <Button
    icon="edit"
    onClick={onEdit}
    style={{ position: 'absolute', right: 20 }}
  />
);

class EmployeeInformation extends Component {
  render() {
    const {
      people: { modalVisible, selectedEmployee, profileModalType },
      profile,
      editProfile,
    } = this.props;

    if (!modalVisible) {
      return null;
    }

    const editable = (profile.roles.some(role => role.roleName === ROLE.ADMIN) || profile.id === selectedEmployee.id) && profileModalType === PROFILE_MODAL_TYPE.VIEW;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <UploadImage name={selectedEmployee.fullName} value={selectedEmployee.avatarUrl} modalType={profileModalType} />
          <div className={styles.skills}>
            <div className={styles.skillTitleBlock}>
              <h3 className={styles.skillTitle}>SKILLS</h3>
              <Divider className={styles.divider} />
            </div>
            <EmployeeSkills skills={selectedEmployee.skills} />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.nameBlock}>
            <h2 className={styles.name}>{selectedEmployee.fullName}</h2>
            <img alt="" src="/assets/location.svg" className={styles.locationIcon} />
            <h4 className={styles.location}>{selectedEmployee.location}</h4>
          </div>
          <h4 className={styles.position}>{selectedEmployee.position.name}</h4>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={<TabIcon icon="user" title="About" />} key="1">
              <div className={styles.tabContainer}>
                <h5 className={styles.blockTitle}>CONTACT INFORMATION</h5>
                <CRow title="Phone" value={selectedEmployee.phone} />
                <CRow title="Address" value={selectedEmployee.address} />
                <CRow title="Email" value={selectedEmployee.email} />
                <CRow title="Social Link" value={<a href={selectedEmployee.socialLink}>{selectedEmployee.socialLink}</a>} />

                <h5 className={styles.blockTitle}>BASIC INFORMATION</h5>
                <CRow title="Birthdate" value={moment(selectedEmployee.birthDate).format('DD/MM/YYYY')} />
                <CRow title="Gender" value={selectedEmployee.gender} />
                <CRow title="Description" value={selectedEmployee.description} />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={<TabIcon icon="eye" title="Timeline" />} key="2">
              <EmployeeTimeline timeLineEvents={selectedEmployee.timeLineEvents} />
            </Tabs.TabPane>
          </Tabs>
        </div>
        <EditProfileButton onEdit={editProfile} visible={editable} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  people: state.people,
  profile: state.passport.profile,
});

const mapDispatchToProps = dispatch => ({
  editProfile: () => dispatch({
    type: 'people/editProfile'
  }),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EmployeeInformation);
