import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tag } from 'antd';

const { CheckableTag } = Tag;

class SkillTags extends Component {
  render() {
    const { selectedSkills, changeSkillsFilter, skills } = this.props;

    return (
      <>
        {skills.map(skill => (
          <CheckableTag
            key={skill.id}
            checked={selectedSkills.indexOf(skill) > -1}
            onChange={checked => changeSkillsFilter(skill, checked)}
          >
            {skill.name}
          </CheckableTag>
        ))}
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedSkills: state.people.selectedSkills,
  skills: state.skills
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
