import React, { Component } from 'react';
import { connect } from 'react-redux';

class BoardHeader extends Component {
  render() {
    return (
      <div>
        <h2 style={{ marginLeft: 10, marginTop: 5, marginBottom: 0 }}>Project Name</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(BoardHeader);
