import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Divider, Tabs, Row, Col, Timeline, Button, Form, Input, DatePicker, Select, Spin, AutoComplete } from 'antd';
import moment from 'moment';
import styles from './index.less';
import { PROFILE_MODAL_TYPE } from '../../utils/constants';
import Avatar from './Avatar';
import TabIcon from './TabIcon';
import SkillSelect from '../SkillSelect';

const FormItem = ({ value, initialValue, component, getFieldDecorator, required }) => {
  const rules = [{ required: required || false }];
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
      loading,
      positions,
      skills
    } = this.props;

    if (!modalVisible) {
      return null;
    }

    const profile = selectedEmployee || {
      id: undefined,
      fullName: undefined,
      avatar: undefined,
      positionId: undefined,
      position: { id: undefined, name: undefined },
      location: undefined,
      address: undefined,
      description: undefined,
      skills: [],
      phone: undefined,
      email: undefined,
      socialLink: undefined,
      birthDate: moment(),
      gender: 'Male',
      role: undefined,
      timeline: [],
    };

    return (
      <Spin spinning={loading}>
        <Form className={styles.container}>
          <div className={styles.left}>
            <Avatar name={profile.fullName} src={profile.avatar} />
            <div className={styles.skills}>
              <div className={styles.skillTitleBlock}>
                <h3 className={styles.skillTitle}>SKILLS</h3>
                <Divider className={styles.divider} />
              </div>
              <SkillSelect userId={profile.id} />
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.nameBlock}>
              <FormItem
                value="fullName"
                initialValue={profile.fullName}
                component={<Input placeholder="Employee Name" />}
                getFieldDecorator={getFieldDecorator}
                required
              />
              <img alt="" src="/assets/location.svg" className={styles.locationIconEditMode} />
              <FormItem
                value="location"
                initialValue={profile.location}
                component={<Input placeholder="Location" />}
                getFieldDecorator={getFieldDecorator}
                required
              />
            </div>

            <FormItem
              value="positionId"
              initialValue={profile.position.id}
              component={(
                <Select
                  showSearch
                  style={{ width: 300 }}
                  placeholder="Position"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {positions.map(item => <Select.Option key={item.id} value={item.id}>{item.name}</Select.Option>)}
                </Select>
              )}
              getFieldDecorator={getFieldDecorator}
              required
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
                      required
                    />
                  </CRow>
                  <CRow title="Address">
                    <FormItem
                      value="address"
                      initialValue={profile.address}
                      component={<Input placeholder="Address" />}
                      getFieldDecorator={getFieldDecorator}
                      required
                    />
                  </CRow>
                  <CRow title="Email">
                    <FormItem
                      value="email"
                      initialValue={profile.email}
                      component={<Input placeholder="Email" />}
                      getFieldDecorator={getFieldDecorator}
                      required
                    />
                  </CRow>
                  <CRow title="Social Link">
                    <FormItem
                      value="socialLink"
                      initialValue={profile.socialLink}
                      component={<Input placeholder="Social Link" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>

                  <h5 className={styles.blockTitle}>BASIC INFORMATION</h5>
                  <CRow title="Birthdate">
                    <FormItem
                      value="birthDate"
                      initialValue={moment(profile.birthDate)}
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
                      component={<Input.TextArea autosize placeholder="Description" />}
                      getFieldDecorator={getFieldDecorator}
                    />
                  </CRow>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab={<TabIcon icon="eye" title="Timeline" />} key="2">
                {/* <FormItem
                  value="newTimeline"
                  initialValue={profile.timeline.join('\n')}
                  component={<Input.TextArea autosize placeholder="Employee Timeline" />}
                  getFieldDecorator={getFieldDecorator}
                /> */}
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
  loading: state.loading.global,
  positions: state.positions,
  skills: state.skills
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
