import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input, Affix, Button } from 'antd';
import styles from './index.less';
import EmployeeList from '../../components/EmployeeList';
import FilterOptions from '../../components/FilterOptions';
import { ROLE } from '../../utils/constants';

const CreateProfileButton = props => {
  const { visible, onClick } = props;
  return visible && (
    <Affix offsetBottom={50} style={{ alignSelf: 'flex-end', marginRight: 50 }}>
      <Button shape="circle" icon="plus" size="large" type="primary" onClick={onClick} />
    </Affix>
  );
};

class People extends Component {
  render() {
    const { people, profile, openEmployeeForm } = this.props;

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
          <CreateProfileButton visible={profile.role === ROLE.ADMIN} onClick={openEmployeeForm} />
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people,
  profile: state.passport.profile
});

const mapDispatchToProps = dispatch => ({
    openEmployeeForm: () => dispatch({
      type: 'people/openEmployeeForm'
    })
  });

export default connect(mapStateToProps, mapDispatchToProps)(People);
