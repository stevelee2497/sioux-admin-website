import React from 'react';
import { Button } from 'antd';

const EmployeeSkills = ({ skills, edit, onRemove }) => {
  if (!skills) {
    return null;
  }

  return skills.map(skill => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
      <h4 key={skill.id} style={{ margin: 0 }}>{skill.skill}</h4>
      {edit && <Button type="link" style={{ padding: 0 }} onClick={() => onRemove(skill.id)}>Remove</Button>}
    </div>
  ));
};

export default EmployeeSkills;
