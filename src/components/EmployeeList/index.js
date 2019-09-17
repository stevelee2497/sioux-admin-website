import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Card } from 'antd';
import styles from './index.less';

class EmployeeList extends Component {
  render() {
    const { employee } = this.props;

    const { dataSource } = employee;

    return (
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <Card bodyStyle={{ display: 'flex' }}>
              <img alt={`${item.name} profile`} src={item.avatar} />
              <div className={styles.info}>
                <h2>{item.name}</h2>
                <h4>{item.position}</h4>
                <h3>{item.description}</h3>
                <button type="button">View Profile</button>
              </div>
            </Card>
          </List.Item>
        )}
        className={styles.container}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  employee: state.employee
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
