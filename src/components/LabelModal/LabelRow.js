import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Input, Button } from 'antd';

class LabelRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.label.name
    };
  }

  onButtonClicked = (e) => {
    this.props.onButtonClicked(e);
    if (!e.id) {
      this.setState({ name: '' });
    }
  }

  handleInputChanged = (e) => {
    this.setState({ name: e.target.value });
  }

  render() {
    const { label, onBlur } = this.props;
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        Color:
        <div style={{ width: 100, marginLeft: 20 }}>
          <Tag color={label.color} style={{ marginRight: 3, marginBottom: 3 }}>
            {label.color}
          </Tag>
        </div>
        Name:
        <Input
          name={label.id}
          value={this.state.name}
          style={{ width: 200, marginLeft: 20 }}
          onBlur={onBlur}
          onChange={this.handleInputChanged}
        />
        <Button
          name={label.id}
          icon={label.id ? 'close' : 'plus'}
          type={label.id ? 'default' : 'primary'}
          shape="circle"
          style={{ marginLeft: 10 }}
          onClick={this.onButtonClicked}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LabelRow);
