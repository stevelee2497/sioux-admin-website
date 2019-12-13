import React, { Component } from 'react';
import { connect } from 'dva';
import { AutoComplete, Avatar } from 'antd';
import _ from 'lodash';
import styles from './index.less';
import { parseImage } from '../../utils/images';
import { ROLE } from '../../utils/constants';

const SelectedEmployee = ({ employee, handleViewProfile }) => (!employee ? null : (
  <>
    <Avatar src={parseImage(employee.avatarUrl)} className={styles.avatar}>
      {employee.fullName.match(/\b\w/g).join('')}
    </Avatar>
    <button type="button" onClick={e => handleViewProfile(employee)} className={styles.name}>{employee.fullName}</button>
  </>
));

class SelectEmployee extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      dataSource: _(props.employees).map(item => ({ value: item.id, text: item.fullName })).value()
    };
  }

  handleSelecting = (id) => {
    const { selectEmployeeTimeSheet, employees } = this.props;
    selectEmployeeTimeSheet(id);
    this.setState({
      inputValue: '',
      dataSource: _(employees).map(item => ({ value: item.id, text: item.fullName })).value()
    });
  }

  handleChanging = inputValue => {
    const dataSource = _(this.props.employees).filter(
      item => item.fullName.toUpperCase().includes(inputValue.toUpperCase())
    ).map(
      item => ({ value: item.id, text: item.fullName })
    ).value();

    this.setState({
      inputValue,
      dataSource
    });
  };

  render() {
    const { selectedEmployee, handleViewProfile, profile } = this.props;
    const { inputValue, dataSource } = this.state;
    // hide this section if the user is not an admin
    if (!profile.roles.some(role => role.roleName === ROLE.ADMIN)) {
      return null;
    }

    return (
      <div className={styles.container}>
        <h4 className={styles.title}>Select Employee</h4>
        <AutoComplete
          dataSource={dataSource}
          style={{ width: 150 }}
          onSelect={this.handleSelecting}
          onChange={this.handleChanging}
          placeholder="Name ..."
          value={inputValue}
          ref={this.input}
          className={styles.input}
        />
        <SelectedEmployee employee={selectedEmployee} handleViewProfile={handleViewProfile} />
      </div>
    );
  }
}

const mapStateToProps = ({
  people: { employees },
  commons: { timesheetSelectedEmployeeId },
  passport: { profile }
}) => ({
  employees,
  employeeId: timesheetSelectedEmployeeId,
  selectedEmployee: employees[timesheetSelectedEmployeeId],
  profile
});

const mapDispatchToProps = dispatch => ({
  selectEmployeeTimeSheet: employeeId => dispatch({
    type: 'commons/selectEmployeeTimeSheet',
    payload: employeeId
  }),
  handleViewProfile: employee => dispatch({
    type: 'people/showProfile',
    payload: employee.id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectEmployee);
