import React from 'react';
import { Button } from 'antd';

const EditProfileButton = ({ onEdit, style, visible }) =>
  visible && <Button icon="edit" style={style} onClick={onEdit} />;

export default EditProfileButton;
