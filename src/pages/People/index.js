import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import styles from './index.less';
import EmployeeList from '../../components/EmployeeList';

class People extends Component {
  render() {
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
          <h2>There are totally 37 employees in the company</h2>
        </div>
        <div className={styles.body}>
          <EmployeeList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(People);
