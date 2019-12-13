import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Button, DatePicker, Divider } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import styles from './index.less';
import ColHeader from './ColHeader';
import Cell from './Cell';
import SelectEmployee from '../../components/SelectEmployee';
import SelectMonth from '../../components/SelectMonth';

class TimeSheets extends Component {
  render() {
    const { tasks, showTaskFromTimeSheets, loading } = this.props;
    let data = _.values(tasks);
    if (Array.isArray(data) && data.length && !data[0].workLogs) {
      data = [];
    }

    const total = {
      key: 'total',
      title: 'Total',
      workLogs: _.keyBy(Array.from({ length: moment().daysInMonth() }).map((value, index) => ({
        day: index + 1,
        amount: data.reduce((a, b) => a + parseInt(b.workLogs[index + 1].amount), 0)
      })), 'day')
    };

    const columns = [
      {
        key: 'taskKey',
        dataIndex: 'taskKey',
        title: 'Key',
        className: styles.fix,
        align: 'center',
        width: 75,
        render: (text, record) => (
          <Button type="link" style={{ height: 0 }} onClick={() => showTaskFromTimeSheets(record)}>{record.boardKey}#{text}</Button>
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
        render: (text, record) => (<Cell row="total" workLog={{ amount: _.values(record.workLogs).reduce((a, b) => a + parseInt(b.amount), 0) }} />),
      },
    ];

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <SelectMonth />
          <Divider type="vertical" className={styles.divider} />
          <SelectEmployee />
        </div>
        <Table
          columns={columns}
          dataSource={[...data, total]}
          scroll={{ x: 'max-content' }}
          size="small"
          bordered
          pagination={false}
          className={styles.table}
          rowClassName={(record) => (record.key === 'total' ? styles.total : null)}
          loading={loading}
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  tasks,
  loading: { global }
}) => ({
  tasks,
  loading: global
});

const mapDispatchToProps = dispatch => ({
  showTaskFromTimeSheets: (task) => dispatch({
    type: 'modals/showTaskFromTimeSheets',
    payload: task
  })
});


export default connect(mapStateToProps, mapDispatchToProps)(TimeSheets);
