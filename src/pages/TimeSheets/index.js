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
    className: styles.col,
    align: 'center',
    render: (text, record) => (
      <Button type="link" style={{ height: 0 }}>#{text}</Button>
    ),
  },
  {
    key: 'title',
    dataIndex: 'title',
    title: 'Title',
    className: styles.col,
    render: (text, record) => (
      <div style={{ wordWrap: 'break-word', wordBreak: 'break-word', width: 300 }}>
        {text}
      </div>
    ),
  },
  ...Array.from({ length: moment().daysInMonth() }).map((value, index) => ({
    key: `workLogs[${index + 1}].amount`,
    title: (<ColHeader index={index + 1} />),
    align: 'center',
    className: styles.col,
    render: (text, record) => (<Cell workLog={record.workLogs[index + 1]} />),
  }))
];

class TimeSheets extends Component {
  render() {
    const { timesheets } = this.props;
    return (
      <Table columns={columns} dataSource={_.values(timesheets)} scroll={{ x: 1300 }} size="small" bordered />
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
