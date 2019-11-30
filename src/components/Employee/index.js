import React, { Component } from 'react';
import { connect } from 'dva';

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
