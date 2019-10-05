import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

class PositionTags extends Component {
  render() {
    const { selectedPosition, changePositionFilter, positions } = this.props;
    return (
      <>
        {positions.map(tag => (
          <CheckableTag
            key={tag.id}
            checked={tag === selectedPosition}
            onChange={checked => changePositionFilter(tag, checked)}
          >
            {tag.name}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedPosition: state.people.selectedPosition,
  positions: state.positions
});

const mapDispatchToProps = dispatch => ({
  changePositionFilter: (tag, checked) => dispatch({ type: 'people/changePositionFilter', payload: checked ? tag : null })
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionTags);
