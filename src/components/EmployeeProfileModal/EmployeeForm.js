import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Tabs, Row, Col, Timeline, Button, Form, Input, DatePicker, Select, Spin } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { ROLE, PROFILE_MODAL_TYPE } from '../../utils/constants';
import Avatar from './Avatar';
import TabIcon from './TabIcon';

const FormItem = ({ value, initialValue, component, getFieldDecorator, required }) => {
  const rules = [{ required }];
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
      people: { modalVisible },
      form: { getFieldDecorator },
      selectedEmployee,
      loading
    } = this.props;

    if (!modalVisible) {
      return null;
    }

    const profile = selectedEmployee || {
      id: undefined,
      name: undefined,
      avatar: undefined,
      position: undefined,
      location: undefined,
      address: undefined,
      description: undefined,
      skills: [],
      phone: undefined,
      email: undefined,
      socialLink: undefined,
      birthDate: moment(),
      gender: undefined,
      role: undefined,
      timeline: [],
    };

    return (
      <Spin spinning={loading}>
        <Form className={styles.container}>
          <div className={styles.left}>
            <Avatar name={profile.name} src={profile.avatar} />
            <div className={styles.skills}>
              <div className={styles.skillTitleBlock}>
                <h3 className={styles.skillTitle}>SKILLS</h3>
                <Divider className={styles.divider} />
              </div>
              <FormItem
                value="newSkills"
                initialValue={profile.skills.join('\n')}
                component={<Input.TextArea autosize placeholder="Employee Skills" />}
                getFieldDecorator={getFieldDecorator}
              />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.nameBlock}>
              <FormItem
                value="name"
                initialValue={profile.name}
                component={<Input placeholder="Employee Name" />}
                getFieldDecorator={getFieldDecorator}
              />
              <img alt="" src="/assets/location.svg" className={styles.locationIconEditMode} />
              <FormItem
                value="location"
                initialValue={profile.location}
                component={<Input placeholder="Location" />}
                getFieldDecorator={getFieldDecorator}
              />
            </div>
            <FormItem
              value="position"
              initialValue={profile.position}
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
                      initialValue={profile.phone}
                      component={<Input placeholder="Phone" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Address">
                    <FormItem
                      value="address"
                      initialValue={profile.address}
                      component={<Input placeholder="Address" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Email">
                    <FormItem
                      value="email"
                      initialValue={profile.email}
                      component={<Input placeholder="Email" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Social Link">
                    <FormItem
                      value="socialLink"
                      initialValue={profile.socialLink}
                      component={<Input placeholder="Social Link" />}
                      getFieldDecorator={getFieldDecorator}
                      required={false}
                    />
                  </CRow>

                  <h5 className={styles.blockTitle}>BASIC INFORMATION</h5>
                  <CRow title="Birthdate">
                    <FormItem
                      value="birthDate"
                      initialValue={moment(profile.birthDate, 'DD/MM/YYYY')}
                      component={<DatePicker format="DD/MM/YYYY" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Gender">
                    <FormItem
                      value="gender"
                      initialValue={profile.gender}
                      component={(
                        <Select>
                          <Select.Option value="Male">Male</Select.Option>
                          <Select.Option value="Female">Female</Select.Option>
                        </Select>
                    )}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                  <CRow title="Description">
                    <FormItem
                      value="description"
                      initialValue={profile.description}
                      component={<Input.TextArea autosize />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab={<TabIcon icon="eye" title="Timeline" />} key="2">
                <FormItem
                  value="newTimeline"
                  initialValue={profile.timeline.join('\n')}
                  component={<Input.TextArea autosize placeholder="Employee Timeline" />}
                  getFieldDecorator={getFieldDecorator}
                />
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
  selectedEmployee: state.people.selectedEmployee,
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
