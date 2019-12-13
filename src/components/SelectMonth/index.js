import React, { Component } from 'react';
import { connect } from 'dva';
import { DatePicker } from 'antd';
import moment from 'moment';
import styles from './index.less';

class SelectMonth extends Component {
  onChange = (date, dateString) => {
    console.log(date, dateString);
  }

  render() {
    return (
      <div className={styles.container}>
        <h4>Select Month</h4>
        <DatePicker.MonthPicker
          onChange={this.onChange}
          className={styles.monthPicker}
          defaultValue={moment()}
          format="MM/YYYY"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(SelectMonth);
