import React, { Component } from 'react';
import { Input, Button } from 'antd';

class ColName extends Component {
  render() {
    const { editting, name, onChange, onSubmit, onBlur } = this.props;

    if (!editting) {
      return <h3>{name}</h3>;
    }

    return (
      <>
        <div style={{ marginBottom: 8 }}><Input value={name} onChange={onChange} size="small" autoFocus onBlur={onBlur} /></div>
        <Button style={{ marginBottom: 8 }} onClick={onSubmit} type="primary" size="small">Update</Button>
      </>
    );
  }
}

export default ColName;
