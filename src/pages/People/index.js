import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Affix, Button } from 'antd';
import styles from './index.less';
import EmployeeList from '../../components/EmployeeList';
import FilterOptions from '../../components/FilterOptions';
import { ROLE } from '../../utils/constants';

class People extends Component {
  render() {
    const { people, profile } = this.props;

    const isAdmin = profile.role === ROLE.ADMIN;

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
          {isAdmin && (
            <Affix offsetBottom={50} style={{ alignSelf: 'flex-end', marginRight: 50 }}>
              <Button shape="circle" icon="plus" size="large" type="primary" />
            </Affix>
          )}
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people,
  profile: state.passport.profile
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(People);
