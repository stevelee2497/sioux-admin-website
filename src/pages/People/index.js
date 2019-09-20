import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'antd';
import styles from './index.less';
import EmployeeList from '../../components/EmployeeList';
import FilterOptions from '../../components/FilterOptions';

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
          <FilterOptions />
          <EmployeeList />
        </div>
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
