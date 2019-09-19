import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Divider, Icon, Tabs, Row, Col, Timeline } from 'antd';
import moment from 'moment';

import styles from './index.less';

class EmployeeProfileModal extends Component {
  render() {
    const {
      people: { modalVisible, selectedEmployee },
      closeModal
    } = this.props;

    if (!modalVisible) {
      return (null);
    }

    return (
      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={closeModal}
        width={900}
        bodyStyle={{ display: 'flex', paddingTop: 30, paddingBottom: 70 }}
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
        <div className={styles.right}>
          <div className={styles.name}>
            <h2>{selectedEmployee.name}</h2>
            <img alt="" src="/assets/location.svg" />
            <h4>{selectedEmployee.location}</h4>
          </div>
          <h4 className={styles.position}>{selectedEmployee.position}</h4>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane
              tab={(
                <span style={{ margin: 0 }}>
                  <Icon type="user" />
                  About
                </span>
              )}
              key="1"
            >
              <div className={styles.tabContainer}>
                <h5 className={styles.blockTitle}>CONTACT INFORMATION</h5>
                <Row>
                  <Col span={6}>
                    <h4>Phone:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>{selectedEmployee.phone}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h4>Address:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>{selectedEmployee.address}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h4>Email:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>{selectedEmployee.email}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h4>Social Link:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>
                      <a href={selectedEmployee.socialLink}>{selectedEmployee.socialLink}</a>
                    </h4>
                  </Col>
                </Row>

                <h5 className={styles.blockTitle}>BASIC INFORMATION</h5>
                <Row>
                  <Col span={6}>
                    <h4>Birthdate:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>{moment(selectedEmployee.birthDate).format('DD/MM/YYYY')}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h4>Gender:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>{selectedEmployee.gender}</h4>
                  </Col>
                </Row>
                <Row>
                  <Col span={6}>
                    <h4>Description:</h4>
                  </Col>
                  <Col span={18}>
                    <h4>{selectedEmployee.description}</h4>
                  </Col>
                </Row>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={(
                <span style={{ margin: 0 }}>
                  <Icon type="eye" />
                  Timeline
                </span>
              )}
              key="2"
            >
              <Timeline className={styles.timeline}>
                <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
              </Timeline>
            </Tabs.TabPane>

          </Tabs>
        </div>
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
