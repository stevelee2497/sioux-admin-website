import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag, Input, Button, Dropdown } from 'antd';
import { TwitterPicker } from 'react-color';

class LabelRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      color: props.color
    };
  }
 
  handleInputChanged = (e) => {
    this.setState({ name: e.target.value });
  }
  
  handleChangeComplete = (color) => {
    this.setState({ color: color.hex });
  };

  handleOnVisibleChange = (visible) => {
    if (!visible) {
      // TODO: call update label api
    }
  }

  handleOnBlur = (e) => {
    const { name: id, value } = e.target;
    if (id) {
      // Update current labels
      const { name, updateLabel, boardId } = this.props;
      if (name !== value) {
        updateLabel({ id, ...this.state, boardId });
      }
    }
  }

  onButtonClicked = (e) => {
    const { name: buttonId } = e.target;
    const { deleteLabel, createLabel, boardId } = this.props;
    if (buttonId) {
      // handle remove label button clicked
      deleteLabel(buttonId);
    } else if (this.state.name) {
      // handle add label button clicked
      createLabel({ ...this.state, boardId });
      this.setState({
        color: '#000000',
        name: ''
      });
    }
  }

  render() {
    const { labelId } = this.props;
    const { name, color } = this.state;

    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 5 }}>
        Color:
        <div style={{ width: 100, marginLeft: 20 }}>
          <Dropdown 
            overlay={(<TwitterPicker triangle="hide" onChangeComplete={this.handleChangeComplete} />)}
            trigger={['click']}
            onVisibleChange={this.handleOnVisibleChange}
          >
            <Tag color={color} style={{ marginRight: 3, marginBottom: 3 }}>
              {color}
            </Tag>
          </Dropdown>
        </div>
        Name:
        <Input
          name={labelId}
          value={name}
          style={{ width: 200, marginLeft: 20 }}
          onBlur={this.handleOnBlur}
          onChange={this.handleInputChanged}
        />
        <Button
          name={labelId}
          icon={labelId ? 'close' : 'plus'}
          type={labelId ? 'default' : 'primary'}
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

const mapDispatchToProps = dispatch => ({
  changeLabelModalState: (visible) => dispatch({
    type: 'modals/changeLabelModalState',
    payload: visible
  }),
  updateLabel: (label) => dispatch({
    type: 'labels/updateLabel',
    payload: label
  }),
  createLabel: (label) => dispatch({
    type: 'labels/createLabel',
    payload: label
  }),
  deleteLabel: (id) => dispatch({
    type: 'labels/deleteLabel',
    payload: id
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(LabelRow);
