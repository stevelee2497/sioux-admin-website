import React, { Component } from 'react';
import { connect } from 'dva';
import { Tag, Popover, Button } from 'antd';
import { ROLE } from '../../utils/constants';

const { CheckableTag } = Tag;

class SkillTags extends Component {
  render() {
    const { selectedSkills, changeSkillsFilter, skills, profile, deleteSkill } = this.props;

    const popoverVisible = !profile.roles.some(role => role.roleName === ROLE.ADMIN) ? { visible: false } : null;

    return (
      <>
        {skills.map(skill => (
          <Popover key={skill.id} content={<Button type="link" onClick={() => deleteSkill(skill.id)}>Delete</Button>} {...popoverVisible}>
            <CheckableTag
              checked={selectedSkills.indexOf(skill) > -1}
              onChange={checked => changeSkillsFilter(skill, checked)}
            >
              {skill.name}
            </CheckableTag>
          </Popover>
        ))}
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedSkills: state.people.selectedSkills,
  skills: state.skills,
  profile: state.passport.profile,
});

const mapDispatchToProps = dispatch => ({
  changeSkillsFilter: (tag, checked) => dispatch({
    type: 'people/changeSkillsFilter',
    payload: { tag, checked }
  }),
  deleteSkill: id => dispatch({
    type: 'skills/deleteSkill',
    payload: id
  }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SkillTags);
