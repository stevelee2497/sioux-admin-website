import { Form } from 'antd';
import React from 'react';

const FormItem = ({ value, initialValue, component, getFieldDecorator, required }) => {
  const rules = [{ required: required || false }];
  return (
    <Form.Item style={{ margin: 0 }}>
      {getFieldDecorator(value, { rules, initialValue })({ ...component })}
    </Form.Item>
  );
};

export default FormItem;
