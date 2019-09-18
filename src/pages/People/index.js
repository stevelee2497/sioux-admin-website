import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import styles from './index.less';
import EmployeeList from '../../components/EmployeeList';
import EmployeeProfileModal from '../../components/EmployeeProfileModal';

class People extends Component {
  render() {
    const { people } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.searchArea}>
          <Input.Search
            placeholder="Employee name"
            enterButton="Search For"
            size="large"
            onSearch={value => console.log(value)}
            className={styles.search}
          />
          <h2>There are totally {people.total} employees in the company</h2>
        </div>
        <div className={styles.body}>
          <EmployeeList />
        </div>
        <EmployeeProfileModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(People);
