import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider } from 'antd';
import styles from './index.less';
import CCheckableTag from '../CCheckableTag';

class FilterOptions extends Component {
  render() {
    return (
      <Card className={styles.container}>
        <div>
          <span style={{ marginRight: 20 }}>Position:</span>
          <CCheckableTag>Manager</CCheckableTag>
          <CCheckableTag>Designer</CCheckableTag>
        </div>
        <Divider dashed style={{ marginTop: 15, marginBottom: 15 }} />
        <div>
          <span style={{ marginRight: 20 }}>Skills:</span>
          <CCheckableTag>Python</CCheckableTag>
          <CCheckableTag>React JS</CCheckableTag>
          <CCheckableTag>React Native</CCheckableTag>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);
