import React, { Component } from 'react';
import { connect } from 'react-redux';

class Employee extends Component {
  render() {
    return (
      <div>
        Employee
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
