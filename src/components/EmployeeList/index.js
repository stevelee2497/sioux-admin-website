import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Card } from 'antd';
import styles from './index.less';
import { parseImage } from '../../utils/images';

class EmployeeList extends Component {
  render() {
    const { people, handlePageChanged, handleViewProfile, loading } = this.props;

    const { dataSource, total, pageSize, page } = people;

    const pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      total,
      onChange: handlePageChanged,
      onShowSizeChange: handlePageChanged,
      defaultPageSize: pageSize,
      defaultCurrent: page,
    };

    return (
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={dataSource}
        loading={loading}
        renderItem={item => (
          <List.Item>
            <Card bodyStyle={{ display: 'flex' }}>
              <img
                alt={`${item.fullName} profile`}
                src={parseImage(item.avatarUrl)}
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/default_avatar.png'; }}
              />
              <div className={styles.info}>
                <div>
                  <h2>{item.fullName}</h2>
                  <h4 className={styles.position}>{item.position.name}</h4>
                </div>
                <h4 className={styles.description}>{item.description}</h4>
                <button type="button" onClick={e => handleViewProfile(item)}>View Profile</button>
              </div>
            </Card>
          </List.Item>
        )}
        className={styles.container}
        pagination={pagination}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  people: state.people,
  loading: state.loading.global
});

const mapDispatchToProps = dispatch => ({
  handlePageChanged: (page, pageSize) => {
    dispatch({
      type: 'people/changePagination',
      payload: { page, pageSize }
    });
  },
  handleViewProfile: employee => {
    dispatch({
      type: 'people/showProfile',
      payload: employee.id
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);
