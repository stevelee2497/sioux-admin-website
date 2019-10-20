import React from 'react';
import { Input, Button } from 'antd';

const ColName = ({ editting, name, onChange, onSubmit }) => {
  if (!editting) {
    return <h3>{name}</h3>;
  }

  return (
    <>
      <div><Input value={name} onChange={onChange} size="small" /></div>
      <Button onClick={onSubmit} type="primary" size="small">Update</Button>
    </>
  );
};

export default ColName;
