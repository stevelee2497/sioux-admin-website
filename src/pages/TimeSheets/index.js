import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import styles from './index.less';
import ColHeader from './ColHeader';
import Cell from './Cell';

const columns = [
  {
    key: 'taskKey',
    dataIndex: 'taskKey',
    title: 'Key',
    className: styles.fix,
    align: 'center',
    width: 75,
    render: (text) => (
      <Button type="link" style={{ height: 0 }}>#{text}</Button>
    ),
    fixed: 'left',
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Title',
    className: styles.fix,
    render: (text) => (
      <div className={styles.title}>
        {text}
      </div>
    ),
    fixed: 'left',
  },
  ...Array.from({ length: moment().daysInMonth() }).map((value, index) => ({
    key: `workLogs[${index + 1}].amount`,
    title: (<ColHeader index={index + 1} />),
    align: 'center',
    className: moment({ day: index + 1 }).day() % 6 < 1 ? styles.weekEndCol : styles.col,
    width: 75,
    render: (text, record) => (<Cell row={record.key} workLog={record.workLogs[index + 1]} />),
  })),
  {
    key: 'sum',
    dataIndex: 'sum',
    title: 'Σ',
    align: 'center',
    width: 75,
    className: styles.fix,
    fixed: 'right',
    render: (text, record) => (<Cell row="total" workLog={{ amount: _.values(record.workLogs).reduce((a, b) => a + b.amount, 0) }} />),
  },
];

class TimeSheets extends Component {
  render() {
    const { timesheets } = this.props;
    const data = _.values(timesheets);
    const total = {
      key: 'total',
      title: 'Total',
      workLogs: _.keyBy(Array.from({ length: moment().daysInMonth() }).map((value, index) => ({
        day: index + 1,
        amount: data.reduce((a, b) => a + b.workLogs[index + 1].amount, 0)
      })), 'day')
    };

    return (
      <div className={styles.container}>
        <Table
          columns={columns}
          dataSource={[...data, total]}
          scroll={{ x: 'max-content' }}
          size="small"
          bordered
          pagination={false}
          className={styles.table}
          rowClassName={(record) => {
            if (record.key === 'total') {
              return styles.total;
            }
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  timesheets
}) => ({
  timesheets
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TimeSheets);
