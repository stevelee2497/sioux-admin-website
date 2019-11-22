import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Divider } from 'antd';

class ColHeader extends Component {
  render() {
    const { index } = this.props;
    return (
      <div>
        <div>
          {moment().format('MMM')}
        </div>
        <div>
          {index}
        </div>
        <Divider type="horizontal" style={{ margin: 2 }} />
        <div>
          {moment({ day: index }).format('ddd')}
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
