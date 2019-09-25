import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const tagsFromServer = ['Manager Director', 'Technical Leader', 'HR Manager', 'Developer'];

class PositionTags extends Component {
  render() {
    const { selectedTag, changePositionFilter } = this.props;
    return (
      <>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={tag === selectedTag}
            onChange={checked => changePositionFilter(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedTag: state.people.selectedPosition
});

const mapDispatchToProps = dispatch => ({
  changePositionFilter: (tag, checked) => dispatch({ type: 'people/changePositionFilter', payload: checked ? tag : null })
});

export default connect(mapStateToProps, mapDispatchToProps)(PositionTags);
