import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

const tagsFromServer = ['Java', 'Python', 'Xamarin', 'React Js'];

class SkillTags extends Component {
  render() {
    const { selectedSkills, changeSkillsFilter } = this.props;

    return (
      <>
        {tagsFromServer.map(tag => (
          <CheckableTag
            key={tag}
            checked={selectedSkills.indexOf(tag) > -1}
            onChange={checked => changeSkillsFilter(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedSkills: state.people.selectedSkills,
});

const mapDispatchToProps = dispatch => ({
  changeSkillsFilter: (tag, checked) => dispatch({
    type: 'people/changeSkillsFilter',
    payload: { tag, checked }
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillTags);
