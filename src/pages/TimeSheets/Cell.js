import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import styles from './index.less';

class Cell extends Component {
  render() {
    const { workLog } = this.props;
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
