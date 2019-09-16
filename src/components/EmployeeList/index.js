import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Card, Button } from 'antd';
import faker from 'faker';
import styles from './index.less';

class EmployeeList extends Component {
  render() {
    const data = Array.from({ length: 1 }).map(_ => ({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      avatar: `https://picsum.photos/id/${faker.random.number({ min: 1, max: 300 })}/500/500`,
      position: faker.name.jobTitle(),
      description: faker.random.words(30),
    }));

    return (
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={data}
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

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
