import React, { Component } from 'react';
import { connect } from 'react-redux';

class ColHeader extends Component {
  render() {
    const { index } = this.props;
    return (
      <div>
        <div>
        Nov
        </div>
        <div>
          {index}
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
