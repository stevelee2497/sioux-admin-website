import React, { Component } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Divider } from 'antd';

class ColHeader extends Component {
  render() {
    const { index, month } = this.props;
    return (
      <div>
        <div>
          {month.format('MMM')}
        </div>
        <div>
          {index}
        </div>
        <Divider type="horizontal" style={{ margin: 2 }} />
        <div>
          {moment({ day: index, month: month.month() }).format('ddd')}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ColHeader);
