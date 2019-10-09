import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Tag, Input, Icon, Popover, Button } from 'antd';
import { ROLE } from '../../utils/constants';

const { CheckableTag } = Tag;

class PositionTags extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.state = {
      inputVisible: false,
      inputValue: '',
    };
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.current.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    this.props.createNewPosition(inputValue);
    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  };

  render() {
    const { selectedPosition, changePositionFilter, profile, positions, deletePosition } = this.props;
    const { inputVisible, inputValue } = this.state;
    const popoverVisible = !profile.roles.some(role => role.roleName === ROLE.ADMIN) ? { visible: false } : null;
    return (
      <>
        {positions.map(tag => (
          <Popover key={tag.id} content={<Button type="link" onClick={() => deletePosition(tag.id)}>Delete</Button>} {...popoverVisible}>
            <CheckableTag
              checked={tag === selectedPosition}
              onChange={checked => changePositionFilter(tag, checked)}
            >
              {tag.name}
            </CheckableTag>
          </Popover>

        ))}
        {inputVisible ? (
          <Input
            ref={this.input}
            type="text"
            size="small"
            style={{ width: 100 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        ) : (
          <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Position
          </Tag>
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedPosition: state.people.selectedPosition,
  positions: state.positions,
  profile: state.passport.profile,
});

const mapDispatchToProps = dispatch => ({
  changePositionFilter: (tag, checked) => dispatch({
    type: 'people/changePositionFilter',
    payload: checked ? tag : null
  }),
  deletePosition: id => dispatch({
    type: 'positions/deletePosition',
    payload: id
  }),
  createNewPosition: (name) => dispatch({
    type: 'positions/createNewPosition',
    payload: name
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PositionTags);
