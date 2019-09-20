import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Divider } from 'antd';
import styles from './index.less';
import PositionTags from '../PositionTags';
import SkillTags from '../SkillTags';

class FilterOptions extends Component {
  render() {
    return (
      <Card className={styles.container}>
        <div>
          <span style={{ marginRight: 20 }}>Position:</span>
          <PositionTags />
        </div>
        <Divider dashed style={{ marginTop: 15, marginBottom: 15 }} />
        <div>
          <span style={{ marginRight: 20 }}>Skills:</span>
          <SkillTags />
        </div>
      </Card>
    );
  }
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterOptions);
