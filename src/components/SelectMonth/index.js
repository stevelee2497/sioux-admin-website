import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import styles from './index.less';

class SelectMonth extends Component {
  onChange = (date) => {
    this.props.selectMonth(date);
  }

  render() {
    const { month } = this.props;

    return (
      <div className={styles.container}>
        <h4>Select Month</h4>
        <DatePicker.MonthPicker
          onChange={this.onChange}
          className={styles.monthPicker}
          value={month}
          format="MM/YYYY"
        />
      </div>
    );
  }
}

const mapStateToProps = ({
  commons: { timeSheetMonth }
}) => ({
  month: timeSheetMonth
});

const mapDispatchToProps = dispatch => ({
  selectMonth: month => dispatch({
    type: 'commons/selectMonth',
    payload: month
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectMonth);
