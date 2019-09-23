import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Tabs, Row, Col, Timeline, Button, Form, Input, DatePicker, Select, Spin } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { ROLE, PROFILE_MODAL_TYPE } from '../../utils/constants';
import Avatar from './Avatar';
import TabIcon from './TabIcon';

const EmployeeSkills = ({ skills }) => skills.map(skill => (
  <h4 key={skill}>{skill}</h4>
));

const FormItem = ({ value, initialValue, component, getFieldDecorator, }) => {
  const rules = [{ required: true }];
  return (
    <Form.Item style={{ margin: 0 }}>
      {getFieldDecorator(value, { rules, initialValue })(component)}
    </Form.Item>
  );
};

const CRow = props => (
  <Row>
    <Col span={6}>
      <h4 style={{ marginTop: 8 }}>{props.title}:</h4>
    </Col>
    <Col span={18}>
      {props.children}
    </Col>
  </Row>
);

class EmployeeForm extends Component {
  render() {
    const {
      people: { modalVisible, selectedEmployee, profileModalType },
      form: { getFieldDecorator },
      loading
    } = this.props;

    if (!modalVisible) {
      return null;
    }

    return (
      <Spin spinning={loading}>
        <Form className={styles.container}>
          <div className={styles.left}>
            <Avatar name={selectedEmployee.name} src={selectedEmployee.avatar} />
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
              <FormItem
                value="name"
                initialValue={selectedEmployee.name}
                component={<Input placeholder="Employee Name" />}
                getFieldDecorator={getFieldDecorator}
              />
              <img alt="" src="/assets/location.svg" className={styles.locationIconEditMode} />
              <FormItem
                value="location"
                initialValue={selectedEmployee.location}
                component={<Input placeholder="Location" />}
                getFieldDecorator={getFieldDecorator}
              />
            </div>
            <FormItem
              value="position"
              initialValue={selectedEmployee.position}
              component={<Input placeholder="Position" />}
              getFieldDecorator={getFieldDecorator}
              style={{ width: 300 }}
            />
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab={<TabIcon icon="user" title="About" />} key="1">
                <div className={styles.tabContainer}>
                  <h5 className={styles.blockTitle}>CONTACT INFORMATION</h5>
                  <CRow title="Phone">
                    <FormItem
                      value="phone"
                      initialValue={selectedEmployee.phone}
                      component={<Input placeholder="Phone" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Address">
                    <FormItem
                      value="address"
                      initialValue={selectedEmployee.address}
                      component={<Input placeholder="Address" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Email">
                    <FormItem
                      value="email"
                      initialValue={selectedEmployee.email}
                      component={<Input placeholder="Email" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Social Link">
                    <FormItem
                      value="socialLink"
                      initialValue={selectedEmployee.socialLink}
                      component={<Input placeholder="Social Link" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>

                  <h5 className={styles.blockTitle}>BASIC INFORMATION</h5>
                  <CRow title="Birthdate">
                    <FormItem
                      value="birthDate"
                      initialValue={moment(selectedEmployee.birthDate, 'DD/MM/YYYY')}
                      component={<DatePicker format="DD/MM/YYYY" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Gender">
                    <FormItem
                      value="gender"
                      initialValue={selectedEmployee.gender}
                      component={(
                        <Select>
                          <Select.Option value="Male">male</Select.Option>
                          <Select.Option value="Female">female</Select.Option>
                        </Select>
                    )}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Description">
                    <FormItem
                      value="description"
                      initialValue={selectedEmployee.description}
                      component={<Input.TextArea rows={7} />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab={<TabIcon icon="eye" title="Timeline" />} key="2">
                <Timeline className={styles.timeline}>
                  <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                  <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                  <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                  <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                </Timeline>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Form>
      </Spin>
    );
  }
}

const mapStateToProps = state => ({
  people: state.people,
  loading: state.loading.global
});

const mapDispatchToProps = dispatch => ({
  editProfile: () => dispatch({
    type: 'people/changeViewType',
    payload: PROFILE_MODAL_TYPE.EDIT,
  }),
});

const WrappedEmployeeForm = Form.create({ name: 'normal_login' })(EmployeeForm);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrappedEmployeeForm);
