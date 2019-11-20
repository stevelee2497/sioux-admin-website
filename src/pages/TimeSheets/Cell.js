import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import styles from './index.less';

class Cell extends Component {
  render() {
    const { workLog, row } = this.props;
    if (row === 'total') {
      return (<h4>{workLog.amount}</h4>);
    }
    return (
      <Button size="small" className={styles.cell}>{workLog.amount}</Button>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Cell);
