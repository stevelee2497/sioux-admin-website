import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Avatar } from 'antd';
import AssignMemberButton from '../AssignMemberButton';
import { parseImage } from '../../utils/images';

class TaskMembers extends Component {
  renderMembers = () => {
    const { employees, task: { taskAssignees } } = this.props;
    return taskAssignees.map(item => {
      const member = employees[item.userId];
      return member && (
        <Avatar
          src={parseImage(member.avatarUrl)}
          key={member.id}
          style={{ marginRight: 2 }}
        >
          {member.fullName.match(/\b\w/g).join('')}
        </Avatar>
      );
    });
  }

  render() {
    const { task } = this.props;

    return (
      <div style={{ fontWeight: 500, marginTop: 20, display: 'flex', flexDirection: 'column' }}>
        MEMBERS
        <div style={{ display: 'flex' }}>
          {this.renderMembers()}
          <AssignMemberButton task={task} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  modals: { task },
  projects: { selectedProject: { users: employees } },
}) => ({
  task,
  employees,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TaskMembers);
