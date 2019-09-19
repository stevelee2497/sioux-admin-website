import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

class CCheckableTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    };
  }

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange} />
    );
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(CCheckableTag);
